import Course, { type IReview } from '$lib/server/db/models/Course';
import type { CourseData } from '$lib/server/models/CoursesList';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	return await parent();
};

export const actions = {
	importFromUniTN: async ({ params, request, locals }) => {
		const { user } = locals;
		if (!user || user.user.role !== 'admin') {
			return error(403, 'You do not have permission to perform this action');
		}

		const formData = await request.formData();
		const offerta = formData.get('offerta') as string;
		if (typeof offerta !== 'string' || !offerta) {
			return error(400, 'Invalid or missing offerta parameter');
		}

		const unitnData = await fetch(
			'https://unitn.coursecatalogue.cineca.it/api/v1/ricercaInsegnamenti',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					insegnamento: '',
					docente: '',
					anno_imm: null,
					anno_off: offerta,
					dipartimento: null,
					tipoCorso: null,
					corsiSearchString: null,
					ssdSearchString: null,
					lingua: null
				})
			}
		);
		if (!unitnData.ok) {
			return error(500, 'Failed to fetch data from UniTN');
		}
		const unitnCourses: CourseData[] = await unitnData.json();

		try {
			for (const unitnCourse of unitnCourses) {
				await Course.importFrom(unitnCourse);
			}
		} catch (err) {
			console.error('Error importing courses:', err);
			return error(500, 'Failed to import courses from UniTN');
		}
	}
} satisfies Actions;
