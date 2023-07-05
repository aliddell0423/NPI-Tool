/** @type {import('./$types').PageLoad} */
import { getAllNotifications } from '$lib/notifications';

export async function load() {
    const notifications = await getAllNotifications();

    return { notifications };
}