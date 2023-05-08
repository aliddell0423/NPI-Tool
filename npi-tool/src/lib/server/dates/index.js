export async function countBusinessDays(startDate, endDate) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);

  let businessDays = 0;

  while (start <= end) {
    
    if (start.getDay() !== 0 && start.getDay() !== 6) {
      businessDays++;
    }

    start.setTime(start.getTime() + oneDay);
  }

  return businessDays;
}
