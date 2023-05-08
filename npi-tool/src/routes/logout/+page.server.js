/** @type {import('./$types').Cookies} */
/** @type {import('./$types').PageServerLoad} */
import { deleteSession } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export function load({cookies}) {
    const sid = cookies.get('sid');
    if (sid) { 
        cookies.delete('sid');
        deleteSession(sid);
    }

    throw redirect(303, '/')
}