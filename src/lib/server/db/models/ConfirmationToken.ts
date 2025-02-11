import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const ConfirmationTokenSchema: Schema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	token: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now }
});

export interface IConfirmationToken extends mongoose.Document<mongoose.Types.ObjectId> {
	/**
	 * The user this confirmation token belongs to.
	 */
	user: mongoose.Types.ObjectId;

	/**
	 * The confirmation token.
	 */
	token: string;

	/**
	 * The date when the ConfirmationToken was registered.
	 */
	createdAt: Date;
}

export interface IConfirmationTokenModel
	extends mongoose.Model<IConfirmationToken, NonNullable<unknown>, IConfirmationTokenMethods> {
	// Static methods go here
	createFor(
		user: mongoose.Types.ObjectId
	): Promise<mongoose.HydratedDocument<IConfirmationToken, IConfirmationTokenMethods>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IConfirmationTokenMethods {
	// Instance methods go here
}

ConfirmationTokenSchema.static('createFor', async function (user: mongoose.Types.ObjectId): Promise<
	mongoose.HydratedDocument<IConfirmationToken, IConfirmationTokenMethods>
> {
	// An user can only have one active confirmation token at a time
	await this.deleteMany({ user });

	const token = new ConfirmationToken({
		user,
		token: crypto.randomBytes(32).toString('hex')
	});
	await token.save();
	return token;
});

// Create the Session model
let ConfirmationToken: IConfirmationTokenModel;

try {
	ConfirmationToken = mongoose.model<IConfirmationToken, IConfirmationTokenModel>(
		'ConfirmationToken',
		ConfirmationTokenSchema
	);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for ConfirmationToken because in development.');
			ConfirmationToken = mongoose.model<IConfirmationToken, IConfirmationTokenModel>(
				'ConfirmationToken',
				ConfirmationTokenSchema,
				undefined,
				{
					overwriteModels: true
				}
			);
		} else
			ConfirmationToken = mongoose.model<IConfirmationToken, IConfirmationTokenModel>(
				'ConfirmationToken'
			);
	else throw e;
}

export default ConfirmationToken;
