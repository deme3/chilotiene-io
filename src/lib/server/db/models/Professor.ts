import mongoose, { Schema } from 'mongoose';
import type { CourseDataDocente } from '$lib/server/models/CoursesList';

const ProfessorSchema: Schema = new Schema({
	universityId: { type: String, required: true },
	fullName: { type: String, required: true },
	crawledAt: { type: Date, required: true, default: Date.now }
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
}

export interface IProfessorModel
	extends mongoose.Model<IProfessor, NonNullable<unknown>, IProfessorMethods> {
	// Static methods go here
	importFrom(data: CourseDataDocente): Promise<IProfessor>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProfessorMethods {
	// Instance methods go here
}

ProfessorSchema.static('importFrom', async function (data: CourseDataDocente): Promise<IProfessor> {
	const professor = await this.findOne({ universityId: data.matricola });
	if (professor) return professor;

	return this.create({
		universityId: data.matricola,
		fullName: data.des
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
