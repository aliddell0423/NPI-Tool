/** @type {import('.@sveltejs/kit').Handle} */
/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/server/db';

export const handle = (async ({ event, resolve }) => {
    const { cookies } = event;
    let sessionFound = false;
    const sid = cookies.get('sid');

    const rolePath = event.url.pathname.split('/')[1];
    
    if (sid) {
        const session = getSession(sid);
        if ( session ) {
            event.locals.email = session.email;
            event.locals.roles = session.roles;
            sessionFound = true;

            if (session.roles != rolePath && rolePath != 'logout') {
                throw redirect(303, `/${session.roles}`)
            }
        }
    }
    

    if (!sessionFound && rolePath !== 'login' && rolePath != 'register' && rolePath != 'api') {
        throw redirect(303, '/login');
    }

    const response = await resolve(event);
    return response;
})