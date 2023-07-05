/** @type {import('./$types').PageLoad} */
import { getUser } from '$lib/server/db';
import { getNotifications } from '$lib/notifications';

export async function load({locals}){

    const { roles, email } = locals

    const userInfo = getUser(email);

    const { first_name, last_name } = userInfo;

    let notifications = await getNotifications(email);
    notifications = notifications.map(notification => ({ ...notification, closed: false }));

    return { first_name, last_name, roles, email, notifications }
}