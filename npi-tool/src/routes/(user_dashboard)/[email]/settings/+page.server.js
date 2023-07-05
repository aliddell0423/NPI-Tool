/** @type {import('./$types').PageLoad} */
import { getHolidays } from '$lib/server/dates';

export async function load() {
    const holidays = await getHolidays();

    return { holidays };
}