import mongoose, { Schema } from 'mongoose';

export enum FeedbackType {
	Bug = 'bug',
	Suggestion = 'suggestion',
	Other = 'other'
}

const FeedbackSchema: Schema = new Schema({
	type: { type: String, enum: Object.values(FeedbackType), required: true },
	contact: { type: String, required: false },
	text: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now }
});

export interface IFeedback extends mongoose.Document {
	/**
	 * The type of feedback.
	 */
	type: FeedbackType;

	/**
	 * The contact e-mail address of the sender, if provided.
	 */
	contact?: string;

	/**
	 * The text of the feedback.
	 */
	text: string;

	/**
	 * The date when the feedback was sent.
	 */
	createdAt: Date;
}

export interface IFeedbackModel
	extends mongoose.Model<IFeedback, NonNullable<unknown>, IFeedbackMethods> {
	// Static methods go here
	sendFeedback(type: FeedbackType, contact: string | undefined, text: string): Promise<IFeedback>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFeedbackMethods {
	// Instance methods go here
}

FeedbackSchema.static(
	'sendFeedback',
	async function (
		type: FeedbackType,
		contact: string | undefined,
		text: string
	): Promise<IFeedback> {
		return this.create({
			type,
			contact,
			text
		});
	}
);

// Create the Session model
let Feedback: IFeedbackModel;

try {
	Feedback = mongoose.model<IFeedback, IFeedbackModel>('Feedback', FeedbackSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Feedback because in development.');
			Feedback = mongoose.model<IFeedback, IFeedbackModel>('Feedback', FeedbackSchema, undefined, {
				overwriteModels: true
			});
		} else Feedback = mongoose.model<IFeedback, IFeedbackModel>('Feedback');
	else throw e;
}

export default Feedback;
