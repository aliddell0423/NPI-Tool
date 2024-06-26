/** @type {import('./$types').PageLoad} */
/** @type {import('./$types').Actions} */
/** @type {import('./$types').RequestHandler} */
import { getOrders, getAssignedEngineers, getEngineerDict} from '$lib/server/db';
import { countBusinessDays } from '$lib/server/dates';

export async function load() {

	const orders = await getOrders("BUILD");

	const tableData = [];
	const assignmentData = {};
	const engineer_dict = await getEngineerDict();

	for (const order of orders) {
		const days_remaining = await countBusinessDays(Date(), order["est_complete_date"]);
		const working_days = await countBusinessDays(order["start_date"], order["est_complete_date"]);

		const assigned_engineers = await getAssignedEngineers(order["work_order"]);

		assignmentData[order["work_order"]] = assigned_engineers;

		const newRow = {...order, 
			"days_remaining": days_remaining, 
			"working_days": working_days
		};
		tableData.push(newRow);
	}

	console.log(assignmentData);


	return { tableData, assignmentData, engineer_dict };
}