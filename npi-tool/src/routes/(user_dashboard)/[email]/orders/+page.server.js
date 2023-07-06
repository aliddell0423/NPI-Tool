/** @type {import('./$types').PageLoad} */
import {getAssignedOrders} from "$lib/server/db"

export async function load({ locals }) {

    const { email } = locals;
    const tableData = await getAssignedOrders(email);

    return { email, tableData };
}