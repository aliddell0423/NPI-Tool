/** @type {import('./$types').PageLoad} */
import { getTimeOff } from '$lib/server/dates';

export async function load({ locals }) {
    const { email } = locals;
    const time_off = getTimeOff(email);

    return { email, time_off };
}