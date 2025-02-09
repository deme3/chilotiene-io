import mongoose, { Schema } from 'mongoose';
import { UserRole } from '$lib/UserRole';

const UserSchema: Schema = new Schema({
	fullName: { type: String, required: true },
	emailAddress: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: Object.values(UserRole), required: true },
	createdAt: { type: Date, required: true, default: Date.now }
});

export interface IUser extends mongoose.Document {
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
	 * The date when the user was registered.
	 */
	createdAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserModel extends mongoose.Model<IUser, NonNullable<unknown>, IUserMethods> {
	// Static methods go here
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserMethods {
	// Instance methods go here
}

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
