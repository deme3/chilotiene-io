import Course, { type IReview } from '$lib/server/db/models/Course';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (typeof params.id !== 'string') {
		error(404, 'Course not found');
	}

	const course = await (await Course.findById(params.id))?.populateCourse();
	const children = await Course.find({ parent: course?.id }).then((courses) =>
		Promise.all(courses.map((course) => course.populateCourse()))
	);

	if (!course) {
		error(404, 'Course not found');
	}

	return {
		course: {
			...course.toObject({ flattenMaps: true, flattenObjectIds: true }),
			id: course.id,
			ratings: course.getRatings(),
			workload: course.getWorkloads()
		},
		children: children.map((child) => ({
			...child.toObject({ flattenMaps: true, flattenObjectIds: true }),
			id: child.id,
			ratings: child.getRatings(),
			workload: child.getWorkloads(),
			grades: course.getGrades()
		}))
	};
};

export const actions = {
	default: async ({ params, request, locals }) => {
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

		let grade;
		if (formData.has('grade')) {
			grade = parseInt(formData.get('grade') as string);

			if (grade < 18 || grade > 31) {
				return error(400, 'Grade must be between 18 and 31');
			}

			if (isNaN(grade)) {
				grade = undefined;
			}
		}

		const review = formData.get('review') as string;
		const imported = formData.get('imported') === 'on';
		const anonymous = formData.get('anonymous') === 'on';
		const quality = parseFloat(formData.get('quality') as string);
		const workload = parseFloat(formData.get('workload') as string);

		// quality and workload must be in 0.5 increments, starting from 0.5 and ending at 5.0
		if (quality < 0.5 || quality > 5 || quality % 0.5 !== 0) {
			return error(400, 'Quality rating must be between 0.5 and 5.0 in 0.5 increments');
		}

		if (workload < 0.5 || workload > 5 || workload % 0.5 !== 0) {
			return error(400, 'Workload rating must be between 0.5 and 5.0 in 0.5 increments');
		}

		if (!anonymous && typeof author !== 'string' && !locals.user?.user) {
			return error(400, 'Author name is required');
		}

		if (typeof review !== 'string') {
			return error(400, 'Review must be a string');
		}

		if (typeof imported !== 'boolean') {
			return error(400, 'Imported must be a boolean');
		}

		if (typeof anonymous !== 'boolean') {
			return error(400, 'Anonymous must be a boolean');
		}

		if (typeof quality !== 'number') {
			return error(400, 'Quality rating must be a number');
		}

		if (typeof workload !== 'number') {
			return error(400, 'Workload rating must be a number');
		}

		course.reviews.push({
			authorName: anonymous ? '' : (locals.user?.user?.fullName ?? author),
			authorId: anonymous ? undefined : locals.user?.user?.id,
			text: review,
			imported,
			anonymous,
			anonymousVerified: anonymous && !!locals.user?.user,
			quality,
			workload,
			grade
		} as IReview);
		await course.save();
	}
};
