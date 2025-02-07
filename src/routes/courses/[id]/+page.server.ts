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
