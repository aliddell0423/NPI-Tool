import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: null });

export async function countBusinessDays(startDate, endDate) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const holidays = await getHolidays();

  start.setHours(0, 0, 0, 0);

  let businessDays = 0;

  while (start <= end) {

    const isHoliday = holidays.includes(`${start.getMonth() + 1}/${start.getDate()}`);
    
    if (start.getDay() !== 0 && start.getDay() !== 6 && !isHoliday) {
      businessDays++;
    }

    start.setTime(start.getTime() + oneDay);
  }

  return businessDays - 1;
}


export async function deleteHoliday(holiday) {
  const stmnt = db.prepare(
    'delete from dates where holidays = $holiday'
  );

  stmnt.run({ holiday });
}

export async function addHoliday(holiday) {
  const stmnt = db.prepare(
    'insert into dates (holidays) values ($holiday)'
  );

  stmnt.run({ holiday });
}

export async function getHolidays() {
  const stmnt = db.prepare(
    'select * from dates'
  )

  const holidays = stmnt.all();
  const result = holidays.map(holiday => holiday.holidays);
  return result;
}

export async function addTimeOff(startDate, endDate, engineer) {
  const stmnt = db.prepare(
    'insert into time_off (start_date, end_date, engineer) values ($startDate, $endDate, $engineer)'
  )

  stmnt.run({startDate, endDate, engineer});
}

export async function getTimeOff(email) {
  const stmnt = db.prepare(
    'select * from time_off where engineer = $email'
  )

  const result = stmnt.all({ email });
  return result;
}

export async function deleteTimeOff(selected) {
  let stmnt;
  for( const id of selected ) {
    stmnt = db.prepare(
      'delete from time_off where id = $id'
    );

    stmnt.run({ id });
  }
}

export function isValidDate(dateString) {
const regex = /^(\d{1,2})\/(\d{1,2})$/;

if (!regex.test(dateString)) {
    return false; // Invalid format
}

const today = new Date();
const [month, day] = dateString.split('/');
const year = today.getFullYear();

const testDate = new Date(year, month - 1, day);

if (testDate.getMonth() !== month - 1) {
    return false; // Invalid date (e.g., February 30th)
}

return true; // Valid date
}

export function isValidFullDate(dateString) {
  const dateParts = dateString.split('/');
  const month = parseInt(dateParts[0], 10);
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  const date = new Date(year, month - 1, day);

  // Check if the parsed date is a valid date
  return (
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getFullYear() === year
  );
}

export function isValidDateRange(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return startDate < endDate;
}
