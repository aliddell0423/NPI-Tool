/** @type {import('./$types').PageLoad} */
import {getAssignedOrders} from "$lib/server/db"

export async function load({ locals }) {

    const { email } = locals;
    let tableList = {};
    tableList["Build Process"] = await getAssignedOrders(email, "BUILD");
    tableList["Await FA Approval"] = await getAssignedOrders(email, "AWAIT");
    tableList["Pilot"] = await getAssignedOrders(email, "PILOT");

    return { email, tableList };
}