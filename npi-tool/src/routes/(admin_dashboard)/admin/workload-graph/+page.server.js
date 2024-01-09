/** @type {import('./$types').PageLoad} */
import { getEngineerDict, getAllAssignedOrders } from '$lib/server/db';
import { getTimeOff } from '$lib/server/dates';

export async function load() {
    const eng_dict = await getEngineerDict();

    let graph_data = {}
    for( const email of Object.keys(eng_dict)) {
        const orders = await getAllAssignedOrders(email);
        const time_off = await getTimeOff(email);

        graph_data[email] = [];

        for( const order of orders ) {
            graph_data[email].push(sanitizeOrder(order));
        }

        for( const time of time_off ) {
            graph_data[email].push(sanitizeTimeOff(time));
        }
    }

    return { graph_data, eng_dict };
}

function sanitizeTimeOff(timeOff) {

    const start_week = getWeekNumber(timeOff.start_date);
    const end_week = getWeekNumber(timeOff.end_date);

    return {
        title: "Vacation",
        start_week,
        end_week
    }
}

function sanitizeOrder(order) {

    const start_week = getWeekNumber(order.start_date);
    const end_week = getWeekNumber(order.est_complete_date);

    return {
        title: order.customer_name,
        start_week,
        end_week
    }

}

function getWeekNumber(dateString) {
    
  const date = new Date(dateString);


  const year = date.getFullYear();
  const dayOfYear = Math.ceil((date - new Date(year, 0, 1)) / (24 * 60 * 60 * 1000)) + 1;


  const weekNumber = Math.ceil(dayOfYear / 7);

  return weekNumber;
}