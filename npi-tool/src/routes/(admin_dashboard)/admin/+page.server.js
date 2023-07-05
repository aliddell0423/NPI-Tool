/** @type {import('./$types').PageLoad} */
/** @type {import('./$types').Actions} */
/** @type {import('./$types').RequestHandler} */
import { getOrderColumns, getOrders, commitTable, commitAssignments, getEngNames, getAssignedEngineers, getFullNameList} from '$lib/server/db';
import { countBusinessDays } from '$lib/server/dates';

export async function load() {

	const row_ref = {
		organization: 0,
		type: 1,
		customer_name: 2,
		assembly: 3,
		sales_order: 4,
		work_order: 5,
		order_quantity: 6,
		region: 7,
		start_date: 8,
		completion_date: 9,
		working_days: 10,
		days_remaining: 11,
		comments: 12,
		stock_number: 13,
		solutions_architect: 14,
		assigned_engineers: 15
	}


	let orderColumns = await getOrderColumns();
	orderColumns.push("Assigned Engineers");

	const orders = await getOrders();

	for( const order of orders ) {
		const result = (await getFullNameList(await getAssignedEngineers(order[5]))).join(", ")
		order.push(result);

		const days_remaining = await countBusinessDays(Date(), order[row_ref['completion_date']]);

		order[row_ref['days_remaining']] = days_remaining;

		const working_days = await countBusinessDays(order[row_ref['start_date']], order[row_ref['completion_date']]);

		order[row_ref['working_days']] = working_days;
		
		order[row_ref['days_remaining']] === -1 ? order[row_ref['days_remaining']] = "LATE": order[row_ref['days_remaining']];
		order[row_ref['days_remaining']] === 0 ? order[row_ref['days_remaining']] = "DUE TODAY": order[row_ref['days_remaining']];
	}

	const names = await getEngNames();

	return { orderColumns, orders, names};
}

export const actions = {
  pushTableChanges: async ({ request }) => {
	const data = await request.formData();
	const rows = JSON.parse(data.get('rows'));

	commitTable(rows)
	commitAssignments(rows)
  }
};