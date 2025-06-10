import Course, { type ICourse } from '$lib/server/db/models/Course';
import Department from '$lib/server/db/models/Department';
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

	const selectedDepartments = url.searchParams.getAll('department');

	const coursesPromise = Course.aggregate([
		{
			$match: {
				$and: [
					{
						name: {
							$exists: true
						}
					},
					{
						departmentCode:
							selectedDepartments.length > 0
								? {
										$in: selectedDepartments
									}
								: {
										$exists: true
									}
					},
					{
						parent: null
					}
				]
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
			$lookup: {
				from: 'professors', // Collection to join
				localField: 'professors', // Field in 'courses' referencing 'teachers' collection
				foreignField: '_id', // Field in 'teachers' that matches
				as: 'populatedProfessors' // Temporary populated field
			}
		},
		{
			$lookup: {
				from: 'professors',
				localField: 'adminHeads',
				foreignField: '_id',
				as: 'populatedAdminHeads'
			}
		},
		{
			$addFields: {
				professorNames: '$populatedProfessors.fullName',
				adminHeadNames: '$populatedAdminHeads.fullName'
			}
		},
		{
			$project: {
				populatedProfessors: 0,
				populatedAdminHeads: 0
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
						librettoCode: {
							$regex: searchTerm,
							$options: 'i'
						}
					},
					{
						professorNames: {
							$elemMatch: {
								$regex: searchTerm,
								$options: 'i'
							}
						}
					},
					{
						adminHeadNames: {
							$elemMatch: {
								$regex: searchTerm,
								$options: 'i'
							}
						}
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
				translations: 0,
				professorNames: 0,
				adminHeadNames: 0
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

	const getProcessedCourses = async () => {
		const dehydratedResults = await coursesPromise;
		const results = dehydratedResults[0]?.results ?? [];
		const hydratedCourses = (results as ICourse[]).map((dehydratedCourse) =>
			Course.hydrate.bind(Course)(dehydratedCourse)
		);

		const populatedCourses = [];
		for (const course of hydratedCourses) {
			populatedCourses.push(await course.populateCourse());
		}

		return Promise.all(
			populatedCourses.map(async (course) => ({
				...course.toObject({ flattenMaps: true, flattenObjectIds: true, virtuals: true }),
				id: course.id,
				reviews: await course.getRatings(),
				workload: await course.getWorkloads(),
				grades: await course.getGrades()
			}))
		);
	};

	const getPagesCount = async () => {
		const dehydratedResults = await coursesPromise;
		const total = dehydratedResults[0]?.metadata[0]?.total ?? 0;
		return 1 + Math.floor(total / 30);
	};

	const getProcessedDepartments = async () => {
		const countedDepartmentCodes = await Course.aggregate([
			// Count the occurrences of each department code
			{
				$group: {
					_id: '$departmentCode',
					count: { $sum: 1 }
				}
			}
		]);

		let departments = await Department.find({}).exec();

		// Sort departments by the number of courses they have: the more courses, the
		// bigger the department, the higher the chance an user from that department
		// is looking for a course.
		departments = departments.sort((a, b) => {
			const aCount = countedDepartmentCodes.find((count) => count._id === a.code)?.count ?? 0;
			const bCount = countedDepartmentCodes.find((count) => count._id === b.code)?.count ?? 0;
			return bCount - aCount;
		});

		return departments.map((department) =>
			department.toObject({ flattenObjectIds: true, flattenMaps: true })
		);
	};

	return {
		searchTerm,
		selectedDepartments,
		currentPage: pageNumber,
		streamed: {
			courses: getProcessedCourses(),
			pages: getPagesCount(),
			departments: getProcessedDepartments()
		}
	};
};
