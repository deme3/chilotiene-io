import Course from '$lib/server/db/models/Course';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	let searchTerm = url.searchParams.get('q');
	if (typeof searchTerm !== 'string') searchTerm = '';

	const courses = Course.aggregate([
		{
			$match: {
				name: {
					$exists: true
				}
			}
		},
		{
			$addFields: {
				translations: {
					$objectToArray: '$name'
				}
			}
		},
		{
			$match: {
				$or: [
					{
						'translations.v': {
							$regex: searchTerm,
							$options: 'i'
						}
					},
					{
						code: {
							$regex: searchTerm,
							$options: 'i'
						}
					}
				]
			}
		},
		{
			$project: {
				pastVersions: 0,
				parent: 0,
				translations: 0
			}
		}
	]).limit(30);

	return {
		searchTerm,
		courses: courses
			.then((dehydratedResults) =>
				dehydratedResults.map((dehydratedCourse) => Course.hydrate.bind(Course)(dehydratedCourse))
			)
			.then((hydratedResults) =>
				hydratedResults.map((course) => ({
					...course.toObject({ flattenMaps: true, flattenObjectIds: true }),
					id: course.id,
					reviews: course.getRatings(),
					workload: course.getWorkloads()
				}))
			)
	};
};
