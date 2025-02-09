import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Feedback, { FeedbackType } from '$lib/server/db/models/Feedback';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		if (!formData.has('type')) {
			return error(400, 'Type is required');
		}

		if (!formData.has('feedback')) {
			return error(400, 'Text is required');
		}

		let contact;
		if (formData.has('contact')) {
			contact = formData.get('contact') as string;
		}

		const type = formData.get('type') as string;
		const feedback = formData.get('feedback') as string;

		if (typeof type !== 'string' || typeof feedback !== 'string') {
			return error(400, 'Invalid form data');
		}

		if (!Object.values(FeedbackType).includes(type as unknown as FeedbackType)) {
			return error(400, 'Invalid feedback type');
		}

		await Feedback.sendFeedback(type as FeedbackType, contact, feedback);
	}
};
