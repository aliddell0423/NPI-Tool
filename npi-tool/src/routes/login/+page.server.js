/** @type {import('./$types').Actions} */
/** @type {import('./$types').Cookies} */
import { checkUserCredentials } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { performLogin } from '$lib/server/login';


export const actions = {
  loginPost: async ({ request, cookies }) => {
    const data = await request.formData();

    const email = data.get('Email')?.toString();
    const password = data.get('Password')?.toString();

    if (!(email && password)) {
      return fail(400, { missing: true });
    }

    const res = await checkUserCredentials(email, password);

    if (res) {
      performLogin(cookies, email)
    }
    else {
      return fail(400, { invalid: true })
    }
  }
};