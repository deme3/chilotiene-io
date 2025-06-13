/**
 * Represents a batch of imported reviews from the aggregator.
 */
export interface ImportedReviewBatch {
	/**
	 * The list of course exam entries with associated reviews and statistics.
	 */
	exams: ImportedReviewerCourseEntry[];
}

/**
 * Represents a single course exam entry, including exam details, statistics, and reviews.
 */
export interface ImportedReviewerCourseEntry {
	/**
	 * Whether the user can review this exam. This can be ignored during import.
	 */
	canReview: boolean;

	/**
	 * The exam details. From this we only need the `examCodePk`.
	 */
	exam: ImportedReviewerExam;

	/**
	 * Statistics about grades for this exam.
	 */
	gradeStats: ImportedReviewerGradeStats;

	/**
	 * Summary of ratings for this exam. We need to calculate, starting from
	 * the aggregated count of votes given, and the reviews with text contained in
	 * the array `reviews`, how many entries of our review table need to be
	 * created.
	 *
	 * For example, if `voted5` is 2, and there is a review with text, we need to
	 * create 2 entries in our review table: one has the text that was found in
	 * the review, and the other has no text nor author, just the rating.
	 */
	ratingSummary: ImportedReviewerRatingSummary;

	/**
	 * List of reviews for this exam.
	 */
	reviews: ImportedReview[];

	/**
	 * The total number of reviews for this exam.
	 */
	reviewsCount: number;

	/**
	 * The current user's rating for this exam, if any.
	 */
	userRating: number | null;
}

/**
 * Details about the exam itself.
 */
export interface ImportedReviewerExam {
	academicYear: number;
	examCfuCents: number;
	examCode: string;

	/**
	 * The exam code according to the aggregator. This is usually in the format:
	 * "000000-UNITN-2014", where we need to extract only the "000000" part, which
	 * is going to be the `librettoCode` of the course.
	 */
	examCodePk: string;
	examDesc: string;
	examRoom: string;
	examStudents: number | null;
	lastUpdated: string | null;
	serviceCode: string;
}

/**
 * Statistics about grades for an exam.
 */
export interface ImportedReviewerGradeStats {
	averageGrade: number;
	count: number;
	difficultyIndex: number;
	gradeBuckets: ImportedReviewerGradeBucket[];
	onBoardingMode: boolean;
}

/**
 * A single grade bucket (e.g., how many students got a certain grade).
 */
export interface ImportedReviewerGradeBucket {
	frequency: number;
	label: string;
	percentage: number;
}

/**
 * Summary of ratings for an exam.
 */
export interface ImportedReviewerRatingSummary {
	total: number;
	positive: number;
	negative: number;
	voted5: number;
	voted4: number;
	voted3: number;
	voted2: number;
	voted1: number;
	average: number;
}

/**
 * A single review for an exam.
 */
export interface ImportedReview {
	agreeCount: number;
	anonymous: boolean;
	disagreeCount: number;
	examCodePk: string;
	ratingDate: string; // ISO date string
	ratingId: number;
	ratingValue: number;
	reviewText: string;
	teacherName: string;
	userFeedback: string | null;
	userName: string;
}
