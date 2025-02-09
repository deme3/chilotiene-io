import * as auth from '$lib/server/auth';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load: PageServerLoad = async () => {};

export const actions = {
	default: async ({ cookies }) => {
		const loginInfo = await auth.checkLogin(cookies);

		if (!loginInfo) return error(401, 'You are not logged in.');

		await auth.terminateSession(loginInfo.jwt.jti);
		redirect(303, `${base}/`);
	}
};
