import { createSession, getUserRole } from "$lib/server/db";
import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').Cookies} */

export function performLogin(cookies, email) {
  const maxAge = 1000 * 60 * 60 * 24 * 2 // 2 days
  const sid = createSession(email, maxAge);
  const roles = getUserRole(email);
  cookies.set('sid', sid, {maxAge})
  throw redirect(303, `/${roles}`);
}