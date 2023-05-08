/** @type {import('./$types').PageLoad} */
/** @type {import('./$types').Actions} */
/** @type {import('./$types').RequestHandler} */
import { getUser, getOrderColumns, getOrders, commitTable, commitAssignments, getEngNames, getAssignedEngineers, getFullNameList} from '$lib/server/db';
import { countBusinessDays } from '$lib/server/dates';

export async function load({ locals }) {


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

	const { roles, email } = locals

	const userInfo = getUser(email);

	const { first_name, last_name } = userInfo;

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
	}

	const names = await getEngNames();

	return { roles, email, first_name, last_name, orderColumns, orders, names};
}

export const actions = {
  pushTableChanges: async ({ request }) => {
	const data = await request.formData();
	const rows = JSON.parse(data.get('rows'));

	commitTable(rows)
	commitAssignments(rows)
  }
};