import { markAsRead } from '$lib/notifications/index.js';

export async function POST(requestEvent) {
    const { request } = requestEvent;
    const body = await request.json();
    const { notif_code } = body;

    markAsRead(notif_code);

    return new Response({ status: 201 })
}