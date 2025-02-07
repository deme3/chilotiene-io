import Course from '$lib/server/db/models/Course';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const courses = Course.find({}).limit(500).select('-pastVersions -parent');

	return {
		courses: courses
			.then((x) =>
				x.map((course) => ({
					...course.toObject({ flattenMaps: true, flattenObjectIds: true }),
					id: course.id,
					reviews: course.getRatings(),
					workload: course.getWorkloads()
				}))
			)
			.then((x) => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(x);
					}, 500);
				});
			})
	};
};
