/** @type {import('./$types').PageLoad} */
import {getOrderColumns, getAssignedOrders} from "$lib/server/db"

export async function load({ params, locals }) {

    const { roles, email } = locals;
    let columns = await getOrderColumns();
    const rows = await getAssignedOrders(email);

    return { roles, email, rows, columns };
}