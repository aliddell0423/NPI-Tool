import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const db = new Database(DB_PATH, { verbose: null });

export async function addUser(first_name, last_name, email, password, roles) {

  const hashedPassword = await bcrypt.hash(password, 12);

  const stmnt = db.prepare(
    'INSERT INTO users (first_name, last_name, email, password, roles) VALUES ($first_name, $last_name, $email, $password, $roles)',
  );
  stmnt.run({first_name, last_name, email, password: hashedPassword, roles});
}

export async function checkUserCredentials(email, password) {
  const stmnt = db.prepare(
    'select password from users where email = $email'
  )
  const row = stmnt.get({ email });
  if(row) {
    return bcrypt.compare(password, row.password);
  }
  return false;
}

export async function checkEmailExists(email) {
  const stmnt = db.prepare(
    'select * from users where email = $email'
  )
  const row = stmnt.get({ email });
  return row;
}

export function createSession(email, maxAge) {
  let session_id = '';
  session_id = getSid();

  const now = new Date();
  const expirationTimestamp = new Date(now.getTime() + maxAge);
  const expiration = expirationTimestamp.toLocaleString('en-CA', {timeZone: 'UTC'});
  
  const roles = getUserRole(email);

  const stmnt = db.prepare(
    'INSERT INTO sessions (session_id, email, expiration, roles) VALUES ($session_id, $email, $expiration, $roles)',
  );
  stmnt.run({session_id, email, expiration, roles});

  return session_id;
}

export function getUserRole(email) {
  const stmnt = db.prepare(
    'select * from users where email = $email'
  )
  const row = stmnt.get({ email });
  return row.roles;
}

export function getUser(email) {
  const stmnt = db.prepare(
    'select * from users where email = $email'
  )
  const row = stmnt.get({ email });
  return row;
}

function getSid() {
  return uuidv4();
}

export function getSession(sid) {
  
  const stmnt = db.prepare(
    'select * from sessions where session_id = $sid'
  )
  const session = stmnt.get({ sid });
  if (session) {
    return session;
  }
  else {
    return undefined;
  }
}

export function deleteSession(sid) {
  
  const stmnt = db.prepare(
    'delete from sessions where session_id = $sid'
  )
  stmnt.run({ sid });
}

export async function getAllOrders() {
  const stmnt = db.prepare(
    `select organization, type, customer_name, 
    assembly, sales_order, work_order, order_quantity, region, 
    start_date, est_complete_date, comments, stock_number, 
    solutions_architect from orders`
  );

  const result = stmnt.all();

  return result;
}


export async function getOrders(status) {
  const stmnt = db.prepare(
    `select organization, type, customer_name, 
    assembly, sales_order, work_order, order_quantity, region, 
    start_date, est_complete_date, comments, stock_number, 
    solutions_architect, db_order_id from orders where build_status like $status`
  );

  const result = stmnt.all({ status: `%${status}%` });

  return result;
}

export async function getAssignedOrders(email, status) {

  const stmnt = db.prepare(`select  organization, type, customer_name, 
    assembly, sales_order, work_order, order_quantity, region, 
    start_date, est_complete_date, comments, stock_number, 
    solutions_architect, on_hold, bp_comp_date, bp_comp_percent from orders
    join engineer_orders on orders.db_order_id = engineer_orders.engineer_order_db_id and orders.build_status like $status 
    where engineer_orders.engineer_email = $email`)

  const result = stmnt.all({ status: `%${status}%`, email });
  return result;
}

export async function getAllAssignedOrders(email) {

  const stmnt = db.prepare(`select  organization, type, customer_name, 
    assembly, sales_order, work_order, order_quantity, region, 
    start_date, est_complete_date, comments, stock_number, 
    solutions_architect, on_hold, bp_comp_date, bp_comp_percent from orders
    join engineer_orders on orders.db_order_id = engineer_orders.engineer_order_db_id
    where engineer_orders.engineer_email = $email`)

  const result = stmnt.all({ email });
  return result;
}

export async function changeOrderStatus(work_order, status) {
  const stmnt = db.prepare(`update orders set build_status = $status 
                            where work_order = $work_order`);

  stmnt.run({ status, work_order });
}

export async function changeOrderAttributes(work_order, comp_date, completion, hold) {
  const stmnt = db.prepare(`update orders set bp_comp_date = $comp_date, 
                            bp_comp_percent = $completion,
                            on_hold = $hold
                            where work_order = $work_order`);

  stmnt.run({ comp_date, completion, hold, work_order });
}

export async function removeAssignedEngineer(engineer_email, engineer_order_db_id, engineer_work_order) {
  const stmnt = db.prepare("delete from engineer_orders where engineer_email = $engineer_email and engineer_order_db_id = $engineer_order_db_id");
  stmnt.run({engineer_email, engineer_order_db_id});
  console.log(`removed ${engineer_email} from work order ${engineer_work_order}`)
}

export async function makeEngineerAssignment(engineer_email, engineer_order_db_id, engineer_work_order) {
  const stmnt = db.prepare("insert into engineer_orders (engineer_email, engineer_order_db_id) values ($engineer_email, $engineer_order_db_id)");
  stmnt.run({engineer_email, engineer_order_db_id});
  console.log(`assigned ${engineer_email} to work order ${engineer_work_order}`)
}

export async function getAssignedEngineers(engineer_order_db_id) {
  const stmnt = db.prepare('select engineer_email from engineer_orders where engineer_order_db_id = $id')
  const id = parseInt(engineer_order_db_id);
  const result = stmnt.all({ id });
  return result;
}

export async function getEngineerDict() {
  const stmnt = db.prepare('select email, first_name, last_name from users');

  const userData = stmnt.all();
  const usersObject = {};

  userData.forEach((user) => {
    const { email, first_name, last_name } = user;
    usersObject[email] = `${first_name} ${last_name}`;
  })

  return usersObject;
}

export async function get_ccl_path(stock_number) {
  const stmnt = db.prepare('select path from ccl_path where stock_number = $stock_number');

  const result = stmnt.get({ stock_number });

  return result;
}

export async function updateCCLPath(path, stock_number) {
  const stmt = db.prepare('INSERT INTO ccl_path (stock_number, path) VALUES ($stock_number, $path)');


  stmt.run( {stock_number, path} );
}


export async function commitTable(data) {

  for (const order of data) {
    const stmt = db.prepare('UPDATE orders SET '
      + 'organization = ?, '
      + 'type = ?, '
      + 'customer_name = ?, '
      + 'assembly = ?, '
      + 'sales_order = ?, '
      + 'order_quantity = ?, '
      + 'region = ?, '
      + 'start_date = ?, '
      + 'est_complete_date = ?, '
      + 'comments = ?, '
      + 'stock_number = ?, '
      + 'solutions_architect = ? '
      + 'WHERE work_order = ?');

    stmt.run(
      order.organization,
      order.type,
      order.customer_name,
      order.assembly,
      order.sales_order,
      order.order_quantity,
      order.region,
      order.start_date,
      order.est_complete_date,
      order.comments,
      order.stock_number,
      order.solutions_architect,
      order.work_order
    );

  }

}

export async function addOrder(order) {

  const stmt = db.prepare('insert into orders ('
    + 'organization, '
    + 'type, '
    + 'customer_name, '
    + 'assembly, '
    + 'sales_order, '
    + 'order_quantity, '
    + 'region, '
    + 'start_date, '
    + 'est_complete_date, '
    + 'stock_number, '
    + 'solutions_architect, '
    + 'work_order) '
    + 'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

  stmt.run(
    order.organization,
    order.type,
    order.customer_name,
    order.assembly,
    order.sales_order,
    order.order_quantity,
    order.region,
    order.start_date,
    order.est_complete_date,
    order.stock_number,
    order.solutions_architect,
    order.work_order
  );
}
