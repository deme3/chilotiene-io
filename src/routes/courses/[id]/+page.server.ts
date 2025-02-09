import Course from '$lib/server/db/models/Course';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (typeof params.id !== 'string') {
		error(404, 'Course not found');
	}

	const course = await (await Course.findById(params.id))?.populateCourse();

	if (!course) {
		error(404, 'Course not found');
	}

	return {
		course: {
			...course.toObject({ flattenMaps: true, flattenObjectIds: true }),
			id: course.id,
			ratings: course.getRatings(),
			workload: course.getWorkloads()
		}
	};
};

export const actions = {
	default: async ({ params, request }) => {
		if (typeof params.id !== 'string') {
			return error(404, 'Course not found');
		}

		const course = await Course.findById(params.id);
		if (!course) {
			return error(404, 'Course not found');
		}

		const formData = await request.formData();

		if (!formData.has('review')) {
			return error(400, 'Review is required');
		}

		if (!formData.has('quality')) {
			return error(400, 'Quality rating is required');
		}

		if (!formData.has('workload')) {
			return error(400, 'Workload rating is required');
		}

		let author;
		if (formData.has('author')) {
			author = formData.get('author') as string;
		}

		const review = formData.get('review') as string;
		const imported = formData.get('imported') === 'on';
		const quality = parseFloat(formData.get('quality') as string);
		const workload = parseFloat(formData.get('workload') as string);

		// quality and workload must be in 0.5 increments, starting from 0.5 and ending at 5.0
		if (quality < 0.5 || quality > 5 || quality % 0.5 !== 0) {
			return error(400, 'Quality rating must be between 0.5 and 5.0 in 0.5 increments');
		}

		if (workload < 0.5 || workload > 5 || workload % 0.5 !== 0) {
			return error(400, 'Workload rating must be between 0.5 and 5.0 in 0.5 increments');
		}

		if (
			typeof author !== 'string' ||
			typeof review !== 'string' ||
			typeof imported !== 'boolean' ||
			typeof quality !== 'number' ||
			typeof workload !== 'number'
		) {
			return error(400, 'Invalid form data');
		}

		course.reviews.push({
			authorName: author,
			text: review,
			imported,
			quality,
			workload
		});
		await course.save();
	}
};
