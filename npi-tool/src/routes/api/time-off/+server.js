import { isValidFullDate, isValidDateRange, addTimeOff, deleteTimeOff } from '$lib/server/dates';

export async function POST(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { startDate, endDate, email } = body;

    if(isValidFullDate(startDate) && isValidFullDate(endDate) && isValidDateRange(startDate, endDate)) {
        addTimeOff(startDate, endDate, email)
        return new Response('Date processed successfully', { status: 200 });
    }
    else {
        return new Response('Invalid date', { status: 400 });
    }
}

export async function DELETE(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { selected } = body;

    deleteTimeOff(selected);
    
    return new Response('Date processed successfully', { status: 200 });
}