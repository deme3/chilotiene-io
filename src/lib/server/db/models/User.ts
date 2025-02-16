import mongoose, { Schema } from 'mongoose';
import { UserRole } from '$lib/UserRole';
import type { IReview } from './Course';
import Course from './Course';

const UserSchema: Schema = new Schema({
	fullName: { type: String, required: true },
	emailAddress: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: Object.values(UserRole), required: true },
	confirmed: { type: Boolean, required: true, default: false },
	confirmedAt: { type: Date },
	createdAt: { type: Date, required: true, default: Date.now }
});

export interface IUser extends mongoose.Document<mongoose.Types.ObjectId> {
	/**
	 * The full name of the user.
	 */
	fullName: string;

	/**
	 * The e-mail address of the user.
	 */
	emailAddress: string;

	/**
	 * The password of the user.
	 */
	password: string;

	/**
	 * The role of the user.
	 */
	role: UserRole;

	/**
	 * Whether the user has confirmed their e-mail address.
	 */
	confirmed: boolean;

	/**
	 * The date when the user confirmed their e-mail address.
	 */
	confirmedAt?: Date;

	/**
	 * The date when the user was registered.
	 */
	createdAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserModel extends mongoose.Model<IUser, NonNullable<unknown>, IUserMethods> {
	// Static methods go here
}

export interface IUserMethods {
	// Instance methods go here
	findReviews(): Promise<(mongoose.Document & IReview)[]>;
}

UserSchema.method('findReviews', async function (this: IUser): Promise<
	(mongoose.Document & IReview)[]
> {
	// Reviews are subdocuments of Course
	const reviews = (await Course.find({ 'reviews.authorId': this._id }))
		.map((course) => [...course.reviews])
		.flat();
	return reviews;
});

// Create the Session model
let User: IUserModel;

try {
	User = mongoose.model<IUser, IUserModel>('User', UserSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for User because in development.');
			User = mongoose.model<IUser, IUserModel>('User', UserSchema, undefined, {
				overwriteModels: true
			});
		} else User = mongoose.model<IUser, IUserModel>('User');
	else throw e;
}

export default User;
