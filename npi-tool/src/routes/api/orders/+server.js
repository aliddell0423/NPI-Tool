import { commitTable, makeEngineerAssignment, removeAssignedEngineer, getAssignedEngineers } from '$lib/server/db/index.js';
import { createNotification } from '$lib/notifications';


export async function PUT(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { assignmentData, tableData } = body;

    commitTable(tableData);
    commitAssignments(assignmentData);


    return new Response('Date processed successfully', { status: 200 });
}

async function commitAssignments(assignmentData) {

    for(const work_order of Object.keys(assignmentData) ) {
        const futureAssignments = assignmentData[work_order];
        const currentAssignments = await getAssignedEngineers(work_order);
        
        const assignments = futureAssignments.filter(item => !currentAssignments.some(obj => obj.engineer_email === item.engineer_email));
        const removals = currentAssignments.filter(item => !futureAssignments.some(obj => obj.engineer_email === item.engineer_email));

        for(const email of assignments ) {
            makeEngineerAssignment(email["engineer_email"], work_order);
            createNotification(`You have been assigned WO: ${work_order}`, email["engineer_email"]);
        }

        for(const email of removals ) {
            removeAssignedEngineer(email["engineer_email"], work_order);
            createNotification(`You have been removed from WO: ${work_order}`, email["engineer_email"]);
        }
    }
}
