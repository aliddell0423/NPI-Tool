/** @type {import('./$types').Actions} */
/** @type {import('./$types').Cookies} */
import { addUser, checkEmailExists } from '$lib/server/db'
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  addUserPost: async ({ request }) => {
    const data = await request.formData();

    const first_name = data.get('FirstName')?.toString();
    const last_name = data.get('LastName')?.toString();
    const email = data.get('Email')?.toString();
    const password = data.get('Password')?.toString();

    if (!(first_name && last_name && email && password)) {
      return fail(400, { missing: true });
    }

    if (await checkEmailExists(email)) {
      return fail(400, { account_exists: true });
    }

    if(!isValidEmail(email)) {
      return fail(400, { invalid_email: true});
    }

    addUser(first_name, last_name, email, password, "user");
    throw redirect(303, '/login')
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
