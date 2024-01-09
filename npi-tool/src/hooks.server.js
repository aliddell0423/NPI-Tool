/** @type {import('.@sveltejs/kit').Handle} */
/** @type {import('./$types').PageLoad} */
import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/server/db';

export const handle = (async ({ event, resolve }) => {
    const { cookies } = event;
    let sessionFound = false;
    const sid = cookies.get('sid');

    const emailPath = event.url.pathname.split('/')[1];
    
    if (sid) {
        const session = getSession(sid);
        if ( session ) {
            event.locals.email = session.email;
            event.locals.roles = session.roles;
            sessionFound = true;

            if( session.roles === "user") {
                if (session.email != emailPath && emailPath != 'logout' && emailPath != 'api') {
                    throw redirect(303, `/${session.email}`)
                }
            }
            else if( session.roles === "admin" ) {
                if (session.roles != emailPath && emailPath != 'logout' && emailPath != 'api') {
                    throw redirect(303, `/${session.roles}`)
                }
            }
        }
    }
    

    if (!sessionFound && emailPath !== 'login' && emailPath != 'register' && emailPath != 'api') {
        throw redirect(303, '/login');
    }

    const response = await resolve(event);
    return response;
})