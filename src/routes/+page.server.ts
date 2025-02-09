import Course, { type ICourse } from '$lib/server/db/models/Course';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	let searchTerm = url.searchParams.get('q');
	const page = url.searchParams.get('page');
	let pageNumber = 1;
	if (typeof searchTerm !== 'string') searchTerm = '';
	if (typeof page !== 'string' || isNaN(parseInt(page))) pageNumber = 1;
	else pageNumber = parseInt(page);
	searchTerm = searchTerm.trim();

	if (pageNumber < 1) pageNumber = 1;

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
				$and: [
					{ coorte: '2024' },
					{
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
				]
			}
		},
		// Courses with the same librettoCode are considered the same course,
		// but we only need the latest offering of the course for listing purposes.
		// When showing in detail, instead, we can merge information from all
		// offerings.
		{ $sort: { coorte: -1 } },
		{ $group: { _id: '$librettoCode', latestEntry: { $first: '$$ROOT' } } },
		{ $replaceRoot: { newRoot: '$latestEntry' } },
		{
			$project: {
				pastVersions: 0,
				parent: 0,
				translations: 0
			}
		},
		{
			$sort: {
				'name.it': 1,
				'name.en': 1
			}
		},
		{
			$facet: {
				metadata: [{ $count: 'total' }],
				results: [{ $skip: (pageNumber - 1) * 30 }, { $limit: 30 }]
			}
		}
	]);

	return {
		searchTerm,
		courses: courses
			.then((dehydratedResults) => {
				return (dehydratedResults[0].results as ICourse[]).map((dehydratedCourse) =>
					Course.hydrate.bind(Course)(dehydratedCourse)
				);
			})
			.then((hydratedResults) =>
				hydratedResults.map((course) => ({
					...course.toObject({ flattenMaps: true, flattenObjectIds: true }),
					id: course.id,
					reviews: course.getRatings(),
					workload: course.getWorkloads()
				}))
			),
		currentPage: pageNumber,
		pages: courses.then(
			(dehydratedResults) => 1 + Math.floor((dehydratedResults[0].metadata[0]?.total ?? 0) / 30)
		)
	};
};
