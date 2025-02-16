/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ChapterScope } from '$lib/ChapterScope';
import { SSDCode } from '$lib/server/models/SSD';
import mongoose, { Schema, type HydratedDocument, type SchemaDefinition } from 'mongoose';
import Professor, { type IProfessor } from './Professor';
import './Professor';
import type { CourseData } from '$lib/server/models/CoursesList';
import type { IDepartment } from './Department';
import Department from './Department';

type FractionalRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
type Grade = 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 30 | 31;

export interface IReview {
	_id: mongoose.Types.ObjectId;
	authorId?: mongoose.Types.ObjectId;
	anonymous: boolean;
	anonymousVerified: boolean;
	authorName?: string;
	text: string;
	workload: FractionalRating;
	quality: FractionalRating;
	grade?: Grade;
	imported: boolean;
	createdAt: Date;
}

export interface ICommonCourseData {
	/**
	 * The `ordinamento_aa` field of a course, it is usually fixed to "2008".
	 */
	ordinamento: '2008' | string;

	/**
	 * The internal code representation for the course in the university systems,
	 * usually used for the libretto. Can be found in the field `adCod`.
	 */
	librettoCode: string;

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
	ssd: `${SSDCode}`[];
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
	adminHeads?: mongoose.Types.ObjectId[];
	professors?: mongoose.Types.ObjectId[];

	lookingForParent?: {
		code: string;
		librettoCode: string;
	};
	createdAt: Date;
	lastUpdated: Date;
}

export interface ICourse extends ICommonCourseData {
	department: string;
	adminHeads: mongoose.Types.ObjectId[];
	professors: mongoose.Types.ObjectId[];
	reviews: (mongoose.Document & IReview)[];
	pastVersions: ICourseDoc[];
}

export interface ICourseDoc extends ICourse, mongoose.Document<mongoose.Types.ObjectId> {}
export interface ICourseSubDoc
	extends ICommonCourseData,
		mongoose.Document<mongoose.Types.ObjectId> {}

export interface ICourseModel
	extends mongoose.Model<
		ICourseDoc,
		{},
		ICourseMethods,
		{},
		mongoose.HydratedDocument<
			ICourseDoc & {
				reviews: mongoose.Types.DocumentArray<IReview>;
				pastVersions: mongoose.Types.DocumentArray<ICourseSubDoc>;
			},
			ICourseMethods
		>
	> {
	// Static methods go here
	importFrom(obj: CourseData): Promise<
		mongoose.HydratedDocument<
			ICourseDoc & {
				reviews: mongoose.Types.DocumentArray<IReview>;
				pastVersions: mongoose.Types.DocumentArray<ICourseSubDoc>;
			},
			ICourseMethods
		>
	>;
}

type PopulatedCourse = HydratedDocument<
	Omit<ICourse, 'parent' | 'adminHeads' | 'professors'> & {
		department: IDepartment;
		parent?: ICourse;
		adminHeads: IProfessor[];
		professors: IProfessor[];
	},
	ICourseMethods
>;

export interface ICourseMethods {
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
	populateCourse(): Promise<HydratedDocument<PopulatedCourse>>;

	/**
	 * Get the average rating of the course by enumerating all the reviews and
	 * calculating the average rating.
	 */
	getAverageRating(): number;

	/**
	 * Get the average workload of the course by enumerating all the reviews
	 * and calculating the average workload.
	 */
	getAverageWorkload(): number;

	/**
	 * Get the numerical ratings of the course for each review.
	 */
	getRatings(): number[];

	/**
	 * Get the numerical workload of the course for each review.
	 */
	getWorkloads(): number[];

	/**
	 * Get the grades of the course for each review, if available.
	 */
	getGrades(): number[];
}

const commonCourseSchema: SchemaDefinition<ICourseDoc> = {
	ordinamento: { type: String, required: true },
	librettoCode: { type: String, required: true },
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
	ssd: {
		type: [
			{
				type: String,
				enum: Object.values(SSDCode)
			}
		],
		required: true
	},
	name: { type: Map, of: String, required: true },
	chapters: {
		...Object.fromEntries(
			Object.values(ChapterScope).map((scope) => [
				scope,
				{
					type: Map,
					of: String,
					required: true,
					default: () => ({})
				}
			])
		)
	},
	parent: { type: Schema.Types.ObjectId, ref: 'Course' },
	adminHeads: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
	professors: [{ type: Schema.Types.ObjectId, ref: 'Professor' }],
	lookingForParent: {
		code: { type: String },
		librettoCode: { type: String }
	},
	createdAt: { type: Date, required: true, default: Date.now },
	lastUpdated: { type: Date, required: true, default: Date.now }
};

const CourseSchema = new Schema<ICourseDoc, ICourseModel, ICourseMethods>(
	{
		...commonCourseSchema,
		reviews: {
			type: [
				new Schema<IReview>({
					authorName: { type: String, required: false },
					authorId: { type: Schema.Types.ObjectId, required: false },
					anonymous: { type: Boolean, required: true, default: true },
					anonymousVerified: { type: Boolean, required: true, default: false },
					text: { type: String, required: true },
					workload: {
						type: Number,
						enum: Array.from({ length: 11 }, (_, i) => i / 2),
						required: true
					},
					quality: {
						type: Number,
						enum: Array.from({ length: 11 }, (_, i) => i / 2),
						required: true
					},
					grade: {
						type: Number,
						enum: Array.from({ length: 14 }, (_, i) => i + 18),
						required: false
					},
					imported: { type: Boolean, required: true },
					createdAt: { type: Date, required: true, default: Date.now }
				})
			],
			required: true,
			default: () => []
		},
		pastVersions: [{ type: new Schema({ ...commonCourseSchema }) }]
	},
	{
		minimize: false
	}
);

CourseSchema.virtual('department', {
	ref: 'Department',
	localField: 'departmentCode',
	foreignField: 'code',
	justOne: true
});

CourseSchema.method('getRemoteURL', function (): string {
	return `https://unitn.coursecatalogue.cineca.it/insegnamenti/${this.offeringYear}/${this.code}/${this.ordinamento}/${this.degreeTrackCode}/${this.degreeCode}?coorte=${this.coorte}&schemaid=${this.schemaId}`;
});

CourseSchema.method('getDetailsURL', function (): string {
	return `https://unitn.coursecatalogue.cineca.it/api/v1/insegnamento?anno=${this.offeringYear}&insegnamento=${this.code}&ordinamento_aa=${this.ordinamento}&af_percorso=${this.degreeTrackCode}&corso_cod=${this.degreeCode}&corso_aa=${this.coorte}&schema_id=${this.schemaId}`;
});

CourseSchema.method('populateCourse', async function (): Promise<PopulatedCourse> {
	return await this.populate<PopulatedCourse>([
		{ path: 'department' },
		{ path: 'parent', model: 'Course' },
		{ path: 'adminHeads', model: 'Professor' },
		{ path: 'professors', model: 'Professor' }
	]);
});

CourseSchema.method('getAverageRating', function (): number {
	const reviews = this.reviews;
	if (reviews.length === 0) return 0;

	const qualitySum = reviews.reduce((prev, curr) => prev + curr.quality, 0);
	return qualitySum / reviews.length;
});

CourseSchema.method('getAverageWorkload', function (): number {
	const reviews = this.reviews;
	if (reviews.length === 0) return 0;

	const workloadSum = reviews.reduce((prev, curr) => prev + curr.workload, 0);
	return workloadSum / reviews.length;
});

CourseSchema.method('getRatings', function (): number[] {
	return this.reviews.map((review) => review.quality);
});

CourseSchema.method('getWorkloads', function (): number[] {
	return this.reviews.map((review) => review.workload);
});

CourseSchema.method('getGrades', function (): number[] {
	return this.reviews.filter((review) => !!review.grade).map((review) => review.grade!);
});

CourseSchema.static('importFrom', async function (obj: CourseData): Promise<
	mongoose.HydratedDocument<
		ICourseDoc & { reviews: mongoose.Types.DocumentArray<IReview> },
		ICourseMethods
	>
> {
	const existing = await this.findOne({
		librettoCode: obj.adCod,
		code: obj.cod,
		degreeTrackCode: obj.af_percorso_id,
		degreeCode: obj.corso_cod,
		coorte: obj.corso_aa,
		offeringYear: obj.aa,
		schemaId: obj.schemaId
	});

	const hasParentToFind = obj.modulo_di && obj.modulo_di.cod && obj.modulo_di.adCod;
	let foundParent = false;
	let parent: mongoose.Types.ObjectId | null = null;

	if (hasParentToFind) {
		const parentCourse = await this.findOne({
			librettoCode: obj.modulo_di.adCod,
			code: obj.modulo_di.cod
		});

		if (parentCourse) {
			parent = parentCourse._id;
			foundParent = true;
		}
	}

	if (!('dip_cod' in obj)) {
		console.log('Warning: Department code not available.');
		obj.dip_cod = '0';
	}

	const department = await Department.findOne({ code: obj.dip_cod });
	const newDepartmentInfo = {
		code: obj.dip_cod,
		name: {
			it: obj.dip_des_it ?? 'Sconosciuto',
			en: obj.dip_des_en ?? 'Unknown'
		}
	};

	if (!department) {
		console.log('Department not found, creating...');
		await Department.create(newDepartmentInfo);
	}

	let ssd: string[] = [];
	if ((typeof obj.ssd === 'string' && obj.ssd === '') || typeof obj.ssd === 'undefined') {
		console.log('Warning: SSD code not available.');
		ssd = [SSDCode.XXX0];
	}

	if (typeof obj.ssd === 'string' && obj.ssd.split(',').length > 1) {
		ssd = obj.ssd.split(',').map((s) => s.trim());
	}

	const adminHeads = [];
	for (const head of obj.responsabili) {
		try {
			adminHeads.push(await Professor.importFrom(head));
		} catch {
			continue;
		}
	}

	const professors = [];
	for (const prof of obj.docenti) {
		try {
			professors.push(await Professor.importFrom(prof));
		} catch {
			continue;
		}
	}

	const baseDocument = {
		ordinamento: obj.ordinamento_aa.toString(),
		librettoCode: obj.adCod,
		code: obj.cod,
		degreeTrackCode: obj.af_percorso_id,
		degreeCode: obj.corso_cod,
		coorte: obj.corso_aa,
		offeringYear: obj.aa,
		schemaId: obj.schemaId,
		departmentCode: obj.dip_cod,
		credits: obj.crediti,
		workload: {
			lectures: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'LEZ')?.valore ?? 0,
			language: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'CIAL')?.valore ?? 0,
			exercises: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'ESE')?.valore ?? 0,
			lab: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'LAB')?.valore ?? 0,
			assessment: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'PRO')?.valore ?? 0,
			finalExam: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'PRF')?.valore ?? 0,
			internship:
				obj.durata.tipo.find((t) => t.tipo_durata_cod === 'STA' || t.tipo_durata_cod === 'T')
					?.valore ?? 0,
			seminar: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'SEM')?.valore ?? 0,
			other: obj.durata.tipo.find((t) => t.tipo_durata_cod === 'ALT')?.valore ?? 0,
			unknown: obj.durata.tipo
				.filter(
					(t) =>
						!['LEZ', 'CIAL', 'ESE', 'LAB', 'PRO', 'PRF', 'STA', 'T', 'SEM', 'ALT'].includes(
							t.tipo_durata_cod
						)
				)
				.reduce((prev, curr) => prev + curr.valore, 0)
		},
		ssd,
		name: {
			it: obj.des_it,
			en: obj.des_en
		},
		chapters: {
			[ChapterScope.Scope]: '',
			[ChapterScope.ExaminationMethods]: '',
			[ChapterScope.TeachingMethods]: '',
			[ChapterScope.TeachingObjectives]: ''
		},
		lookingForParent:
			hasParentToFind && !foundParent
				? {
						code: obj.modulo_di.cod,
						librettoCode: obj.modulo_di.adCod
					}
				: undefined,
		adminHeads,
		professors
	};

	const anyoneLookingForMe = await this.find({
		lookingForParent: {
			code: obj.cod,
			librettoCode: obj.adCod
		}
	});

	if (existing) {
		console.log('Exists already. Updating with new data...');
		const existingPojo = existing.toObject() as ICourse;
		const minimalPojo = {
			...existingPojo,
			department: undefined,
			parent: undefined,
			reviews: undefined,
			pastVersions: undefined
		} as ICommonCourseData;

		existing.lastUpdated = new Date();
		existing.pastVersions.push(minimalPojo);
		await existing.save();

		await existing.updateOne({
			...baseDocument
		});

		if (anyoneLookingForMe.length > 0) {
			console.log('Found someone looking for me, updating them...');
			await Promise.all(
				anyoneLookingForMe.map((doc) =>
					doc.updateOne({
						parent: existing._id,
						lastUpdated: new Date(),
						lookingForParent: null
					})
				)
			);
		}

		return existing;
	}

	const newDoc = await this.create({
		...baseDocument,
		parent: foundParent ? (parent?._id ?? null) : null,
		adminHeads: [],
		professors: [],
		reviews: [],
		pastVersions: []
	});

	if (anyoneLookingForMe.length > 0) {
		console.log('Found someone looking for me, updating them...');
		await Promise.all(
			anyoneLookingForMe.map((doc) =>
				doc.updateOne({
					parent: newDoc._id,
					lastUpdated: new Date(),
					lookingForParent: null
				})
			)
		);
	}

	return newDoc;
});

// Create the Session model
let Course: ICourseModel;

try {
	Course = mongoose.model<ICourseDoc, ICourseModel>('Course', CourseSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Course because in development.');
			Course = mongoose.model<ICourseDoc, ICourseModel>('Course', CourseSchema, undefined, {
				overwriteModels: true
			});
		} else Course = mongoose.model<ICourseDoc, ICourseModel>('Course');
	else throw e;
}

export default Course;
