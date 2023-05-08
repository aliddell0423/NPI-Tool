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


export async function getUnformattedOrderColumns() {

  const stmnt = db.prepare(
    'pragma table_info(orders)'
  );

  const result = stmnt.all();
  const result_list = result.map(row => row.name);

  return result_list;
}


export async function getOrderColumns() {

  const stmnt = db.prepare(
    'pragma table_info(orders)'
  );

  const result = stmnt.all();

  const result_list = result.map(row => row.name);

	const formattedColumns = result_list.map(col => {
	const words = col.split('_');
	const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(' ');
	});

  return formattedColumns;
}

export async function getOrders() {
  const stmnt = db.prepare(
    'select * from orders'
  );

  const result = stmnt.all();

  return result.map(order => Object.values(order));
}

export async function getEngNames() {
  let stmnt_f = db.prepare(
    'select first_name from users'
  );

  const first_names = stmnt_f.all();

  let stmnt_l = db.prepare(
    'select last_name from users'
  );

  const last_names = stmnt_l.all();

  return first_names.map((first_name, index) => `${first_name['first_name']} ${last_names[index]['last_name']}`);
}

function getWorkOrders() {
  const stmnt = db.prepare(
    'select work_order from orders'
  );

  const work_orders = stmnt.all();
  const result = work_orders.map(item => item.work_order);
  return result;
}

export async function getAssignedEngineers(work_order) {
  const stmnt = db.prepare(
    'SELECT users.email FROM users '
    + 'JOIN engineer_orders ON users.email = engineer_orders.engineer_email '
    + 'WHERE engineer_orders.work_order = $work_order'
  );

  const engineers = stmnt.all({ work_order });
  const result = engineers.map(item => item.email );
  return result;
}

export async function getFullNameList(list) {
  let new_list = [];
  list.forEach((email) => {
    new_list.push(getFullName(email));
  });

  const result = new_list.map(user => `${user.first_name} ${user.last_name}`);

  return result;
}

function getFullName(email) {
  const stmnt = db.prepare(
    'SELECT first_name, last_name FROM users '
    + 'WHERE email = $email'
  );

  const engineer = stmnt.get({email});
  return engineer;

}

export async function compileAssignmentList() {
  const work_orders = getWorkOrders();
  const engineerEmails = {};

  work_orders.map(work_order => {
    engineerEmails[work_order] = getAssignedEngineers(work_order);
  });

  return engineerEmails;
  
}

export async function commitAssignments(rows) {
  const columns = await getUnformattedOrderColumns();

  const data = mapRowsToColumns(rows, columns);


  for (const row of data) {
    let pushed_emails = [];
    const pushed_data = row[undefined].split(", ");
    const work_order = row.work_order;
    let current_engineers = await getAssignedEngineers(work_order);

    for (const name of pushed_data) {
      const email = getEmailFromName(name);
      if (email){
        pushed_emails.push(email.email);
      }
    }
    const inserts = pushed_emails.filter((element) => !current_engineers.includes(element));
    const deletes = current_engineers.filter((element) => !pushed_emails.includes(element));

    for (const email of inserts) {
      makeEngineerAssignment(email, work_order);
    }
    for (const email of deletes) {
      removeAssignedEngineer(email, work_order);
    }
  }
}

function removeAssignedEngineer(engineer_email, work_order) {
  const stmnt = db.prepare("delete from engineer_orders where engineer_email = $engineer_email and work_order = $work_order");
  stmnt.run({engineer_email, work_order});
  console.log(`removed ${engineer_email} from work order ${work_order}`)
}

function makeEngineerAssignment(engineer_email, work_order) {
  const stmnt = db.prepare("insert into engineer_orders (engineer_email, work_order) values ($engineer_email, $work_order)");
  stmnt.run({engineer_email, work_order});
  console.log(`assigned ${engineer_email} to work order ${work_order}`)
}

export function getEmailFromName(name) {

  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];

  const stmnt = db.prepare(
    'select email from users where first_name = $first_name and last_name = $last_name'
  )
  const row = stmnt.get({ first_name, last_name });
  return row;
}

function mapRowsToColumns(rows, columns) {

  const data = rows.map(row => {
  return row.reduce((acc, cell, index) => {
    const column = columns[index];
    acc[column] = cell;
    return acc;
    }, {});
  });

  return data;
}

export async function getAssignedOrders(email) {
  const stmnt = db.prepare('select orders.* from orders '
     + 'join engineer_orders on orders.work_order = engineer_orders.work_order '
     + 'where engineer_orders.engineer_email = $email')

  const result = stmnt.all({ email });
  const dataArray = result.map(dict => Object.values(dict));
  return dataArray;
}


export async function commitTable(rows) {

  const columns = await getUnformattedOrderColumns();

  const data = mapRowsToColumns(rows, columns);

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
      + 'working_days = ?, '
      + 'days_remaining = ?, '
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
      order.working_days,
      order.days_remaining,
      order.comments,
      order.stock_number,
      order.solutions_architect,
      order.work_order
    );

  }

}
