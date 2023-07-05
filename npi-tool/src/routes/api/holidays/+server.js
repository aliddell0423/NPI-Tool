import { deleteHoliday, addHoliday, isValidDate } from '$lib/server/dates/index.js';

export async function DELETE(requestEvent) {
    const { request } = requestEvent;
    const body = await request.json();
    const { holiday } = body;

    deleteHoliday(holiday);

    return new Response({ status: 201 })
}

export async function POST(requestEvent) {

    const { request } = requestEvent;
    const body = await request.json();
    const { holiday } = body;

    if(isValidDate(holiday)) {
        addHoliday(holiday);
        return new Response('Date processed successfully', { status: 200 });
    }
    else {
        return new Response('Invalid date', { status: 400 });
    }
}