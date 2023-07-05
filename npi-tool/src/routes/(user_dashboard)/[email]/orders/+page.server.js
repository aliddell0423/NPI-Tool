/** @type {import('./$types').PageLoad} */
import {getOrderColumns, getAssignedOrders} from "$lib/server/db"

export async function load({ locals }) {

    const { email } = locals;
    let columns = await getOrderColumns();
    const rows = await getAssignedOrders(email);

    return { email, rows, columns };
}