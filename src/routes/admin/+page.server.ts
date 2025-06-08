import { DonationInfo } from '$lib/server/db/models/DonationInfo';
import { Donation } from '$lib/server/db/models/Donation';
import Course from '$lib/server/db/models/Course';
import type { CourseData } from '$lib/server/models/CoursesList';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Types } from 'mongoose';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	const donationInfo = await DonationInfo.get();
	const donations = await Donation.find({ year: new Date().getFullYear() })
		.sort({ createdAt: -1 })
		.lean();

	const raised = donations.reduce((acc, d) => acc + d.amount, 0);

	return {
		...parentData,
		goal: donationInfo.goal,
		raised,
		donations: donations.map((d) => ({
			_id: (d._id as Types.ObjectId).toString(),
			name: d.name,
			amount: d.amount,
			createdAt: (d.createdAt as Date).toISOString()
		}))
	};
};

export const actions = {
	importFromUniTN: async ({ request, locals, url }) => {
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
			return { success: true, action: url.search };
		} catch (err) {
			console.error('Error importing courses:', err);
			return fail(500, {
				error: 'Failed to import courses from UniTN',
				action: url.search
			});
		}
	},

	addDonation: async ({ request, locals, url }) => {
		const { user } = locals;
		if (!user || user.user.role !== 'admin') {
			return error(403, 'You do not have permission to perform this action');
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const amount = Number(formData.get('amount'));

		if (!name || !amount || amount <= 0) {
			return fail(400, {
				error: 'Valid name and positive amount are required',
				action: url.search
			});
		}

		try {
			await Donation.create({ name, amount });
			return { success: true, action: url.search };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Failed to add donation', action: url.search });
		}
	},

	removeDonation: async ({ request, locals, url }) => {
		const { user } = locals;
		if (!user || user.user.role !== 'admin') {
			return error(403, 'You do not have permission to perform this action');
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		if (!id) {
			return fail(400, { error: 'Id is required', action: url.search });
		}

		try {
			await Donation.findByIdAndDelete(id);
			return { success: true, action: url.search };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Failed to remove donation', action: url.search });
		}
	},

	updateGoal: async ({ request, locals, url }) => {
		const { user } = locals;
		if (!user || user.user.role !== 'admin') {
			return error(403, 'You do not have permission to perform this action');
		}

		const formData = await request.formData();
		const goal = Number(formData.get('goal'));

		if (isNaN(goal) || goal < 0) {
			return fail(400, { error: 'Valid goal is required', action: url.search });
		}

		try {
			await DonationInfo.updateGoal(goal);
			return { success: true, action: url.search };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Failed to update goal', action: url.search });
		}
	}
} satisfies Actions;
