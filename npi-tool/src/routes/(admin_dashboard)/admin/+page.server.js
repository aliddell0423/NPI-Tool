/** @type {import('./$types').PageLoad} */
/** @type {import('./$types').Actions} */
/** @type {import('./$types').RequestHandler} */
import { getOrders, getAssignedEngineers, getEngineerDict} from '$lib/server/db';
import { countBusinessDays } from '$lib/server/dates';

export async function load({ locals }) {

	const orders = await getOrders("BUILD");
	const adminEmail = locals.email

	const tableData = [];
	const assignmentData = {};
	const engineer_dict = await getEngineerDict();

	for (const order of orders) {
		const days_remaining = await countBusinessDays(Date(), order["est_complete_date"]);
		const working_days = await countBusinessDays(order["start_date"], order["est_complete_date"]);

		const assigned_engineers = await getAssignedEngineers(order["db_order_id"]);

		assignmentData[order["db_order_id"]] = assigned_engineers;

		const newRow = {...order, 
			"days_remaining": days_remaining, 
			"working_days": working_days
		};
		tableData.push(newRow);
	}


	return { tableData, assignmentData, engineer_dict, adminEmail };
}

export const actions = {
    addOrderPost: async ({request}) => {
		const data = await request.formData();
		console.log(data);

	}
}