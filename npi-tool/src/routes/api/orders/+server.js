import { commitTable, makeEngineerAssignment, removeAssignedEngineer, getAssignedEngineers, addOrder, changeOrderStatus, changeOrderAttributes} from '$lib/server/db/index.js';
import { getTimeOff } from '$lib/server/dates/index.js';
import { createNotification } from '$lib/notifications';

export async function PATCH(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { status, work_order } = body;

    changeOrderStatus(work_order, status);

    return new Response('Date processed successfully', { status: 200 });
}


export async function OPTIONS(requestEvent) {
    const { request } = requestEvent;
    const body = await request.json();
    const { work_order, comp_date, completion, hold } = body;

    changeOrderAttributes(work_order, comp_date, completion, hold);
    
    return new Response('Date processed successfully', { status: 200 });
}

export async function POST(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { postData } = body;

    addOrder(postData);

    return new Response('Date processed successfully', { status: 200 });
}

export async function PUT(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { assignmentData, tableData, adminEmail } = body;

    commitTable(tableData);
    const { success, message } = await commitAssignments(assignmentData, tableData, adminEmail);

    if(!success) {
        return new Response(message, { status: 400 });
    }
    else {
        return new Response('Date processed successfully', { status: 200 });
    }

}

async function commitAssignments(assignmentData, tableData, adminEmail) {

    for(const db_order_id of Object.keys(assignmentData) ) {
        const futureAssignments = assignmentData[db_order_id];
        const currentAssignments = await getAssignedEngineers(db_order_id);
        const dates = findRangeDates(tableData, db_order_id);
        
        const assignments = futureAssignments.filter(item => !currentAssignments.some(obj => obj.engineer_email === item.engineer_email));
        const removals = currentAssignments.filter(item => !futureAssignments.some(obj => obj.engineer_email === item.engineer_email));

        for(const email of assignments ) {
            const timeOff = await getTimeOff(email["engineer_email"]);

            const conflictingDate = isInTimeOff(dates, timeOff);

            if( conflictingDate ) {
                const { start_date, end_date } = conflictingDate;
                const success = false;
                const message = `Assigning ${email["engineer_email"]} WO: ${work_order} causes a conflict with their time off: ${start_date} - ${end_date}`;
                return { success, message };
            }

        }
        
        for(const email of assignments ) {
            makeEngineerAssignment(email["engineer_email"], db_order_id);
            createNotification(`You have been assigned a new work order`, email["engineer_email"]);
        }
        for(const email of removals ) {
            removeAssignedEngineer(email["engineer_email"], db_order_id);
            createNotification(`You have been removed from a work order`, email["engineer_email"]);
        }

    }

    return { success: true, message: "Data transfer successful"};
}

function isDateInRange(targetDate, startDate, endDate) {
    const targetDate_raw = new Date(targetDate);
    const startDate_raw = new Date(startDate);
    const endDate_raw = new Date(endDate);
    const targetTime = targetDate_raw.getTime();
    const startTime = startDate_raw.getTime();
    const endTime = endDate_raw.getTime();


     return targetTime >= startTime && targetTime <= endTime;
}

function isInTimeOff(dates, timeOff) {
    for(const timeRange of timeOff) {
        const { start_date, end_date } = timeRange;
        const { startDate, endDate } = dates;

        if (isDateInRange(start_date, startDate, endDate) || isDateInRange(end_date, startDate, endDate)) {
            return { start_date, end_date };
        }
    }
    return null;
}

function findRangeDates(tableData, db_id) {
    let selectedOrder;
    for( const order of tableData ) {
        if(order.db_order_id == db_id) {
            selectedOrder = order
        }
    }

    return {
        startDate: selectedOrder.start_date, 
        endDate: selectedOrder.est_complete_date
    };
}
