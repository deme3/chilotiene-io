import { ChapterScope } from '$lib/server/models/ChapterScope';
import { SSDCode } from '$lib/server/models/SSD';
import mongoose, { Schema } from 'mongoose';
import type { IProfessor } from './Professor';

type FractionalRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface IReview {
	_id: mongoose.Types.ObjectId;
	authorName: string;
	text: string;
	workload: FractionalRating;
	difficulty: FractionalRating;
	imported: boolean;
	createdAt: Date;
}

export interface ICourse extends mongoose.Document {
	/**
	 * The `ordinamento_aa` field of a course, it is usually fixed to "2008".
	 */
	ordinamento: '2008' | string;

	/**
	 * The internal code representation for the course in the university systems.
	 * Can be found in the field `cod` and its format is
	 * `${degreeTrackCode}_123456_12345`
	 */
	code: string;

	/**
	 * The code for the degree programme track this course is offered in. Can be
	 * found in the field `af_percorso_id`.
	 */
	degreeTrackCode: string;

	/**
	 * The code for the degree programme this course is offered in. Can be found
	 * in the field `corso_cod`.
	 */
	degreeCode: string;

	/**
	 * The year a student has to be enrolled to in order to have this course in
	 * their study plan. For example, a student taking a third-year course offered
	 * in 2024 has coorte = 2022 (their first year).
	 *
	 * This information is taken from the field `corso_aa`.
	 *
	 * See also `offeringYear`.
	 */
	coorte: string;

	/**
	 * The year this course was offered in. One should refer to the current year
	 * for this field in order to get updated information for a course.
	 *
	 * This information is taken from the field `aa`.
	 */
	offeringYear: string;

	/**
	 * The significance of this field is unclear, however, it is used to create
	 * the URL to the course page.
	 */
	schemaId: string;

	/**
	 * The code for the department this course is offered by. This is then looked
	 * up in another table for translation.
	 */
	departmentCode: string;

	/**
	 * The amount of ECTS credits assigned to this course.
	 */
	credits: number;

	/**
	 * Declared workload by activity for this course, in hours.
	 */
	workload: {
		/**
		 * Workload marked as "LEZ"
		 */
		lectures: number;

		/**
		 * Workload marked as "CIAL"
		 */
		language: number;

		/**
		 * Workload marked as "ESE"
		 */
		exercises: number;

		/**
		 * Workload marked as "LAB"
		 */
		lab: number;

		/**
		 * Workload marked as "PRO"
		 */
		assessment: number;

		/**
		 * Workload marked as "PRF"
		 */
		finalExam: number;

		/**
		 * Workload marked as "STA" or "T"
		 */
		internship: number;

		/**
		 * Workload marked as "SEM"
		 */
		seminar: number;

		/**
		 * Workload marked as "ALT"
		 */
		other: number;

		/**
		 * Unknown workload marker
		 */
		unknown: number;
	};
	ssd: `${SSDCode}`;
	name: { [key: string]: string };
	chapters: {
		[key in `${ChapterScope}`]: {
			it: string;
			en: string;
			[key: string]: string;
		};
	};

	/**
	 * Courses can be "modules of" other courses, this can be coded with a
	 * reference to another Course object.
	 *
	 * This information is found in the `modulo_di` optional field, one should
	 * search by `modulo_di.cod == Course.code` and
	 * `modulo_di.adCod == Course.degreeCode`.
	 */
	parent?: mongoose.Types.ObjectId;
	adminHeads: mongoose.Types.ObjectId[];
	professors: mongoose.Types.ObjectId[];

	reviews: IReview[];
}

type PopulatedCourse = Omit<ICourse, 'parent' | 'adminHeads' | 'professors' | 'reviews'> & {
	parent?: ICourse;
	adminHeads: IProfessor[];
	professors: IProfessor[];
	reviews: IReview[];
};

export interface ICourseModel
	extends mongoose.Model<ICourse, NonNullable<unknown>, ICourseMethods> {
	// Static methods go here
	importFrom(obj: object): ICourse;
}

export interface ICourseMethods {
	reviews?: mongoose.Types.DocumentArray<IReview>;

	/**
	 * Craft the URL for accessing more course information via the University
	 * website.
	 *
	 * The remote URL is crafted as follows:
	 *
	 * ```js
	 * `https://unitn.coursecatalogue.cineca.it/insegnamenti/${this.offeringYear}/${this.code}/${this.ordinamento}/${this.degreeTrackCode}/${this.degreeCode}?coorte=${this.coorte}&schemaid=${this.schemaId}`
	 * ```
	 */
	getRemoteURL(): string;

	/**
	 * Craft the URL for accessing more course information via the APIs.
	 */
	getDetailsURL(): string;

	/**
	 * Populate the course with the professors, admin heads, and parent course, if
	 * available.
	 */
	populateCourse(): Promise<PopulatedCourse>;
}

const CourseSchema: Schema = new Schema(
	{
		ordinamento: { type: String, required: true },
		code: { type: String, required: true },
		degreeTrackCode: { type: String, required: true },
		degreeCode: { type: String, required: true },
		coorte: { type: String, required: true },
		offeringYear: { type: String, required: true },
		schemaId: { type: String, required: true },
		departmentCode: { type: String, required: true },
		credits: { type: Number, required: true },
		workload: {
			lectures: { type: Number, required: true },
			language: { type: Number, required: true },
			exercises: { type: Number, required: true },
			lab: { type: Number, required: true },
			assessment: { type: Number, required: true },
			finalExam: { type: Number, required: true },
			internship: { type: Number, required: true },
			seminar: { type: Number, required: true },
			other: { type: Number, required: true },
			unknown: { type: Number, required: true }
		},
		ssd: { type: String, enum: Object.values(SSDCode), required: true },
		name: { type: Map, of: String, required: true },
		chapters: {
			...Object.fromEntries(
				Object.values(ChapterScope).map((scope) => [
					scope,
					{
						type: Map,
						of: String,
						required: true,
						default: {}
					}
				])
			)
		},
		parent: { type: Schema.Types.ObjectId, ref: 'Course' },
		adminHeads: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
		professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
		reviews: [
			new Schema<IReview>({
				authorName: { type: String, required: true },
				text: { type: String, required: true },
				workload: {
					type: Number,
					enum: Array.from({ length: 11 }, (_, i) => i / 2),
					required: true
				},
				difficulty: {
					type: Number,
					enum: Array.from({ length: 11 }, (_, i) => i / 2),
					required: true
				},
				imported: { type: Boolean, required: true },
				createdAt: { type: Date, required: true }
			})
		]
	},
	{
		minimize: false
	}
);

CourseSchema.method<ICourse>('getRemoteURL', function (): string {
	return `https://unitn.coursecatalogue.cineca.it/insegnamenti/${this.offeringYear}/${this.code}/${this.ordinamento}/${this.degreeTrackCode}/${this.degreeCode}?coorte=${this.coorte}&schemaid=${this.schemaId}`;
});

CourseSchema.method<ICourse>('getDetailsURL', function (): string {
	return `https://unitn.coursecatalogue.cineca.it/api/v1/insegnamento?anno=${this.offeringYear}&insegnamento=${this.code}&ordinamento_aa=${this.ordinamento}&af_percorso=${this.degreeTrackCode}&corso_cod=${this.degreeCode}&corso_aa=${this.coorte}&schema_id=${this.schemaId}`;
});

CourseSchema.method<ICourse>('populateCourse', async function (): Promise<PopulatedCourse> {
	return await this.populate<PopulatedCourse>([
		{ path: 'parent', model: 'Course' },
		{ path: 'adminHeads', model: 'Professor' },
		{ path: 'professors', model: 'Professor' }
	]);
});

// Create the Session model
let Course: ICourseModel;

try {
	Course = mongoose.model<ICourse, ICourseModel>('Course', CourseSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Course because in development.');
			Course = mongoose.model<ICourse, ICourseModel>('Course', CourseSchema, undefined, {
				overwriteModels: true
			});
		} else Course = mongoose.model<ICourse, ICourseModel>('Course');
	else throw e;
}

export default Course;
