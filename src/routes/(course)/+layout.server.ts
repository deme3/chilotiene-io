import Course, { type ICourseDoc } from '$lib/server/db/models/Course';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { base } from '$app/paths';

export const load: LayoutServerLoad = async ({ params }) => {
	let targetId;
	if (params.id) {
		targetId = params.id;
	} else if (params.seoid) {
		/* Target ID should be queried from server by the latest
    { $sort: { coorte: -1 } },
		{ $group: { _id: '$librettoCode', latestEntry: { $first: '$$ROOT' } } },
		{ $replaceRoot: { newRoot: '$latestEntry' } },
    */
		targetId = params.seoid;

		// SOI courses have "SOI-" preprended to the ID, so we consider that format
		// instead
		const soiSafeId = targetId.startsWith('SOI')
			? targetId.split('-', 2).join('-')
			: targetId.split('-')[0];

		const course = (await Course.aggregate([
			{
				$match: {
					$or: [
						{
							librettoCode: soiSafeId,
							parent: null
						},
						{
							code: soiSafeId,
							librettoCode: soiSafeId.split('/')[0],
							parent: { $ne: null }
						}
					]
				}
			},
			{ $sort: { coorte: -1, lastUpdated: -1 } },
			{ $group: { _id: '$librettoCode', latestEntry: { $first: '$$ROOT' } } },
			{ $replaceRoot: { newRoot: '$latestEntry' } },
			{ $limit: 1 },
			{ $project: { _id: 1 } }
		]).exec()) as ICourseDoc[];

		if (course && course[0]) targetId = course[0]._id.toString();
		else error(404, 'Course not found');
	}

	if (typeof targetId !== 'string') {
		error(404, 'Course not found');
	}

	const course = await (await Course.findById(targetId))?.populateCourse();
	const children = await Course.find({ parent: course?.id }).then((courses) =>
		Promise.all(courses.map((course) => course.populateCourse()))
	);

	if (!course) {
		error(404, 'Course not found');
	}

	// If the url pathname is not equal to the full slug, redirect to the full slug
	const fullSlug = course.getSlug();
	if (params.seoid && params.seoid !== fullSlug) {
		return redirect(303, `${base}/${encodeURIComponent(fullSlug)}`);
	}

	if (!params.seoid && params.id) {
		return redirect(303, `${base}/${encodeURIComponent(fullSlug)}`);
	}

	return {
		course: {
			...course.toObject({ flattenMaps: true, flattenObjectIds: true, virtuals: true }),
			id: course.id,
			ratings: await course.getRatings(), // includeChildren will be left false here because we're already including the children in the response, and the frontend will calculate
			workload: await course.getWorkloads(),
			grades: await course.getGrades(),
			parent: course.parent
				? course.parent.populateCourse().then(async (course) => ({
						...course.toObject({
							flattenMaps: true,
							flattenObjectIds: true,
							virtuals: true
						}),
						id: course.id,
						ratings: await course.getRatings(true),
						workload: await course.getWorkloads(true),
						grades: await course.getGrades(true)
					}))
				: null
		},
		children: await Promise.all(
			children.map(async (child) => ({
				...child.toObject({ flattenMaps: true, flattenObjectIds: true, virtuals: true }),
				id: child.id,
				ratings: await child.getRatings(),
				workload: await child.getWorkloads(),
				grades: await child.getGrades()
			}))
		)
	};
};
