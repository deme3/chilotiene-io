import mongoose from 'mongoose';
import type { Model, Document } from 'mongoose';

/**
 * @description
 * This is a singleton model.
 * To use it, you should always use the static methods:
 * - DonationInfo.get()
 * - DonationInfo.updateGoal(goal, year?)
 */

export interface IDonationInfo extends Document {
	goal: number;
	year: number;
}

export interface IDonationInfoModel extends Model<IDonationInfo> {
	get(year?: number): Promise<IDonationInfo>;
	updateGoal(goal: number, year?: number): Promise<IDonationInfo>;
}

const donationInfoSchema = new mongoose.Schema(
	{
		goal: {
			type: Number,
			required: true,
			default: 50
		},
		year: {
			type: Number,
			required: true,
			unique: true,
			default: () => new Date().getFullYear()
		}
	},
	{
		timestamps: true
	}
);

donationInfoSchema.statics.get = async function (this: Model<IDonationInfo>, year?: number) {
	const targetYear = year || new Date().getFullYear();
	let instance = await this.findOne({ year: targetYear });
	if (!instance) {
		instance = await this.create({ year: targetYear });
	}
	return instance;
};

donationInfoSchema.statics.updateGoal = async function (
	this: Model<IDonationInfo>,
	goal: number,
	year?: number
) {
	const targetYear = year || new Date().getFullYear();
	const instance = await this.findOneAndUpdate(
		{ year: targetYear },
		{ goal },
		{ new: true, upsert: true }
	);
	if (!instance) {
		return this.create({ goal, year: targetYear });
	}
	return instance;
};

let DonationInfo: IDonationInfoModel;

try {
	DonationInfo = mongoose.model<IDonationInfo, IDonationInfoModel>(
		'DonationInfo',
		donationInfoSchema
	);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError) {
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for DonationInfo because in development.');
			DonationInfo = mongoose.model<IDonationInfo, IDonationInfoModel>(
				'DonationInfo',
				donationInfoSchema,
				undefined,
				{
					overwriteModels: true
				}
			);
		} else {
			DonationInfo = mongoose.model<IDonationInfo, IDonationInfoModel>('DonationInfo');
		}
	} else {
		throw e;
	}
}

export { DonationInfo };
