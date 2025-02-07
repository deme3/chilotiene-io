export type GeneratedSchemaForRoot = CourseData[];

export interface CourseDataDocente {
	/**
	 * This is the Persona ID of the teacher in the university systems. It can be
	 * used to craft the URL to the teacher's profile page on the university
	 * website, by prepending `PER` to the value.
	 *
	 * This value seems to correspond to the `matricola` field all the time.
	 */
	cod: string;

	/**
	 * This should contain the URL to the teacher's profile page on the university
	 * website. However, this field is mostly left empty.
	 */
	hyperlink: string;

	/**
	 * The internal code representation for the teacher in the university systems.
	 *
	 * This value seems to correspond to the `cod` field all the time.
	 */
	matricola: string;

	/**
	 * The name of the teacher in the course.
	 */
	des: string;

	/**
	 * The academic year the course is offered in. Note that this is only the
	 * first part of the academic year, e.g. "2021" for the academic year
	 * 2021/2022.
	 */
	aa: string;

	respDidFlg: number | boolean;
	titolareFlg: boolean;
	lezioneFlg: boolean;

	/**
	 * This field is always empty as it refers to a CINECA service that is not
	 * enabled by the University of Trento.
	 */
	urlUnifind: string;

	/**
	 * This field contains the role of the teacher in the course. If not present,
	 * the default label to be used is "Docente".
	 */
	raggruppamentoDocente?: {
		/**
		 * The code for the role of the teacher in the course. Known codes are:
		 * - `AS`: Teaching Assistant
		 * - `TU`: Tutor
		 */
		coperturaCod: 'AS' | 'TU' | string;

		/**
		 * The description of the role of the teacher in the course (Italian)
		 */
		coperturaDes_it: string;

		/**
		 * The description of the role of the teacher in the course (English)
		 */
		coperturaDes_en: string;
	};

	/**
	 * If the course is divided into parts, this field contains the code of the
	 * part this teacher is responsible for.
	 */
	domPartCod: string;
}

export interface CourseDataDurataItem {
	/**
	 * The type of the duration of the course. Known values are:
	 * - `LEZ`: Lecture
	 * - `LAB`: Laboratory
	 * - `CIAL`: Language center
	 * - `ESE`: Exercise
	 * - `PRO`: Test / Exam
	 * - `PRF`: Final exam
	 * - `STA`: Internship
	 * - `T`: Internship
	 * - `SEM`: Seminar
	 * - `ALT`: Other
	 */
	tipo_durata_cod: 'LEZ' | 'LAB' | 'CIAL' | 'ESE' | 'PRO' | 'PRF' | 'STA' | 'T' | 'SEM' | 'ALT';

	/**
	 * The translation for the code indicated in field `tipo_durata_cod` (IT)
	 */
	tipo_durata_des_it: string;

	/**
	 * The translation for the code indicated in field `tipo_durata_cod` (EN)
	 */
	tipo_durata_des_en: string;

	/**
	 * The amount of hours of workload.
	 */
	valore: number;
}

export interface CourseDataDurata {
	/**
	 * The sum of duration of all entries in field `tipo` (`tipo[x].valore`)
	 */
	totale: number;

	/**
	 * The breakdown of workload hours.
	 */
	tipo: CourseDataDurataItem[];
}

export interface CourseData {
	/**
	 * This is always `unitn`.
	 */
	ate_cod: string;
	corso_anno: number;
	corso_des_it: string;
	corso_des_en: string;
	corso_cod: string;
	cdsCod: string;
	corso_aa: string;
	corso_ccMasterFlg: string;
	corso_ccRaggrCod: string;
	tipo_corso_cod: string;
	tipo_corso_des_it: string;
	tipo_corso_des_en: string;
	dip_cod?: string;
	dip_des_it: string;
	dip_des_en: unknown;
	corso_percorso_des_it: string;
	corso_percorso_des_en: string;
	corso_percorso_id: number;
	corso_percorso_cod: string;
	des_it: string;
	des_en: string;
	cod: string;
	adCod: string;
	aa: string;
	ordinamento_aa: number;
	schemaCod: string;
	schemaId: number;
	af_percorso_id: string;
	af_percorso_cod: string;
	adPadre: {
		[k: string]: unknown;
	};
	adFiglie: unknown[];
	annoCorsoAnticipo?: number;
	statoAttivita: string;
	tipoEsaCod: string;
	tipoEsaDes_it: string;
	tipoEsaDes_en: string;
	valutazione_it: string;
	valutazione_en: string;
	linkTeledidattica: string;
	tipo_ins_cod: string;
	tipo_ins_des_it: string;
	tipo_ins_des_en: string;
	lingua_des_it: string;
	lingua_des_en: string;
	lingua_cod: string;
	periodo_didattico_it: string;
	periodo_didattico_en: string;
	sede_des_it: string;
	sede_des_en: unknown;
	sede_cod: string;
	modalita_didattica_cod: string;
	modalita_didattica_des_it: string;
	modalita_didattica_des_en: string;
	data_inizio_periodo_didattico: string;
	data_fine_periodo_didattico: string;
	isPart: boolean;
	isMod: boolean;
	titolari: unknown[];
	responsabili: CourseDataDocente[];
	docenti: CourseDataDocente[];
	frequenza_it: string;
	frequenza_en: string;
	crediti: number;
	oreMinimeFrequenza: string;
	durata: CourseDataDurata;
	tipo_it: string;
	tipo_en: string;
	ambito_it: string;
	ambito_en: string;
	ambitoInterclasse_it: string;
	ambitoInterclasse_en: string;
	intercla_tipo_it: string;
	intercla_tipo_en: string;
	metodi_didattici_it: string;
	metodi_didattici_en: string;
	ssd: string;
	udCod: string;
	mutuaDa: unknown;
	mutuazioneFlg: number;
	modulo_di: {
		cod: string;
		adCod: string;
		des_it: string;
		des_en: string;
	};
	dataCreazione: string;
	dataModifica: string;
	utenteCreazioneId: string;
	utenteModificaId: string;
}
