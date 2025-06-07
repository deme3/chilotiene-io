import * as auth from '$lib/server/auth';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		if (!formData.has('email') || !formData.has('password')) {
			return error(400, 'Email and password are required');
		}

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (typeof email !== 'string' || typeof password !== 'string') {
			return error(400, 'Invalid form data');
		}

		const result = await auth.performLogin(
			email,
			password,
			cookies,
			request.headers.get('user-agent') ?? ''
		);

		if (!result) {
			return error(401, 'Invalid email or password');
		}

		return {
			success: true
		};
	}
};
