import User from '$lib/server/db/models/User';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	let id = params.id;

	if (typeof id === 'undefined' && locals.user) {
		id = locals.user.user.id;
	}

	if (typeof id !== 'string') {
		error(404, 'User not found');
	}

	const user = await User.findById(id);

	if (!user) {
		error(404, 'User not found');
	}

	return {
		profile: {
			...user.toObject({ flattenMaps: true, flattenObjectIds: true }),
			id: user.id
		},
		reviews: (await user.findReviews())
			.filter((review) => !review.anonymous)
			.map((review) => ({
				...review.toObject({ flattenMaps: true, flattenObjectIds: true }),
				id: review.id
			}))
	};
};

export const actions = {
	default: async () => {}
};
