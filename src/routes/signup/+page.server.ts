import * as auth from '$lib/server/auth';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		if (!formData.has('fullName') || !formData.has('email') || !formData.has('password')) {
			return error(400, 'Full name, email and password are required');
		}

		const fullName = formData.get('fullName') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const privacyAccepted = ((formData.get('privacy') as string) ?? 'off') === 'on';

		if (typeof email !== 'string' || typeof password !== 'string') {
			return error(400, 'Invalid form data');
		}

		if (!privacyAccepted) {
			return error(400, 'You must accept the privacy policy to sign up.');
		}

		if (!email.endsWith('@studenti.unitn.it') && !email.endsWith('@unitn.it')) {
			return error(400, 'Email must be a valid @studenti.unitn.it or @unitn.it email.');
		}

		const newUser = await auth.registerNewUser(fullName, email, password);
		if (!newUser) error(500);

		await auth.performLogin(email, password, cookies, request.headers.get('user-agent') ?? '');
	}
};
