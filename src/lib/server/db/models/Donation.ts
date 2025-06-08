import mongoose from 'mongoose';
import type { InferSchemaType, Types } from 'mongoose';

const donationSchema = new mongoose.Schema(
	{
		amount: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		year: {
			type: Number,
			required: true,
			default: () => new Date().getFullYear()
		}
	},
	{
		timestamps: true
	}
);

export type Donation = InferSchemaType<typeof donationSchema> & { _id: Types.ObjectId };

let Donation: mongoose.Model<Donation>;

try {
	Donation = mongoose.model<Donation>('Donation', donationSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError) {
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Donation because in development.');
			Donation = mongoose.model<Donation>('Donation', donationSchema, undefined, {
				overwriteModels: true
			});
		} else {
			Donation = mongoose.model<Donation>('Donation');
		}
	} else {
		throw e;
	}
}

export { Donation };
