import mongoose, { Schema } from 'mongoose';
import type { ICourse } from './Course';

const ProfessorSchema: Schema = new Schema({
	universityId: { type: String, required: true },
	fullName: { type: String, required: true },
	crawledAt: { type: Date, required: true, default: Date.now },
	history: {
		type: [
			{
				fullName: { type: String, required: true },
				coursesSnapshot: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }],
				crawlTime: { type: Date, required: true, default: Date.now }
			}
		],
		required: true,
		default: []
	}
});

export interface IProfessor extends mongoose.Document {
	/**
	 * The full name of the professor.
	 */
	fullName: string;

	/**
	 * The university ID ("matricola") of the professor.
	 */
	universityId: string;

	/**
	 * The date when the professor was last crawled.
	 */
	crawledAt: Date;

	/**
	 * The history of the professor's courses.
	 */
	history: {
		/**
		 * The full name of the professor at the time of the crawl.
		 */
		fullName: string;

		/**
		 * The snapshot of the courses that the professor had at the time of the crawl.
		 */
		coursesSnapshot: mongoose.Types.ObjectId[];

		/**
		 * The time when the crawl was made.
		 */
		crawlTime: Date;
	}[];
}

type PopulatedProfessor = Omit<IProfessor, 'history'> & {
	history: (Omit<IProfessor['history'][0], 'coursesSnapshot'> & {
		coursesSnapshot: ICourse[];
	})[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- for the future
export interface IProfessorModel
	extends mongoose.Model<IProfessor, NonNullable<unknown>, IProfessorMethods> {
	// Static methods go here
}

export interface IProfessorMethods {
	// Instance methods go here
	populateHistory(): Promise<PopulatedProfessor>;
}

ProfessorSchema.method('populateHistory', async function (): Promise<PopulatedProfessor> {
	return await this.populate<PopulatedProfessor>({
		path: 'history',
		populate: {
			path: 'coursesSnapshot',
			model: 'Course'
		}
	});
});

// Create the Session model
let Professor: IProfessorModel;

try {
	Professor = mongoose.model<IProfessor, IProfessorModel>('Professor', ProfessorSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Professor because in development.');
			Professor = mongoose.model<IProfessor, IProfessorModel>(
				'Professor',
				ProfessorSchema,
				undefined,
				{
					overwriteModels: true
				}
			);
		} else Professor = mongoose.model<IProfessor, IProfessorModel>('Professor');
	else throw e;
}

export default Professor;
