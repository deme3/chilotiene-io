import { DonationInfo } from '$lib/server/db/models/DonationInfo';
import { Donation } from '$lib/server/db/models/Donation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const donationInfo = await DonationInfo.get();
	const donations = await Donation.find({ year: new Date().getFullYear() })
		.sort({ createdAt: -1 })
		.lean();

	const raised = donations.reduce((acc, d) => acc + d.amount, 0);

	return {
		goal: donationInfo.goal,
		raised,
		donors: donations.map((d) => d.name)
	};
};
