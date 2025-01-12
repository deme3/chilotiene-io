import type { Handle } from '@sveltejs/kit';
import '$lib/server/db/database';
import Course from '$lib/server/db/models/Course';

export const handle: Handle = async ({ event, resolve }) => {
	// You can add custom logic here, for example, authentication or logging
	console.log(`Request for ${event.url.pathname}`);

	// await Course.importFrom({
	// 	ate_cod: 'unitn',
	// 	corso_anno: 1,
	// 	corso_des_it: 'MEDICINA E CHIRURGIA',
	// 	corso_des_en: 'MEDICINE AND SURGERY',
	// 	corso_cod: '10739',
	// 	cdsCod: '1001S',
	// 	corso_aa: '2024',
	// 	corso_ccMasterFlg: '0',
	// 	corso_ccRaggrCod: '',
	// 	tipo_corso_cod: 'LM6',
	// 	tipo_corso_des_it: 'Laurea Magistrale Ciclo Unico 6 anni',
	// 	tipo_corso_des_en: 'Laurea Magistrale Ciclo Unico 6 anni',
	// 	dip_cod: '23',
	// 	dip_des_it: 'Centro Interdipartimentale di Scienze Mediche - CISMed',
	// 	dip_des_en: null,
	// 	corso_percorso_des_it: 'Schema di piano Medicina e Chirurgia 2024',
	// 	corso_percorso_des_en: 'Schema di piano Medicina e Chirurgia 2024',
	// 	corso_percorso_id: 50517,
	// 	corso_percorso_cod: 'PDS0-2020',
	// 	des_it: 'Fisica medica',
	// 	des_en: 'Physics for Medicine',
	// 	cod: '110000/1',
	// 	adCod: '110000',
	// 	aa: '2024',
	// 	ordinamento_aa: 2020,
	// 	schemaCod: 'CC1001S-24',
	// 	schemaId: 8628,
	// 	af_percorso_id: '50517',
	// 	af_percorso_cod: 'PDS0-2020',
	// 	adPadre: {},
	// 	adFiglie: [],
	// 	annoCorsoAnticipo: undefined,
	// 	statoAttivita: 'B',
	// 	tipoEsaCod: 'S',
	// 	tipoEsaDes_it: 'Scritto',
	// 	tipoEsaDes_en: 'Scritto',
	// 	valutazione_it: 'Voto Finale',
	// 	valutazione_en: 'Final grade',
	// 	linkTeledidattica: '',
	// 	tipo_ins_cod: '',
	// 	tipo_ins_des_it: '',
	// 	tipo_ins_des_en: '',
	// 	lingua_des_it: 'Italiano',
	// 	lingua_des_en: 'Italian',
	// 	lingua_cod: 'ita',
	// 	periodo_didattico_it: 'Primo Semestre',
	// 	periodo_didattico_en: 'First semester',
	// 	sede_des_it: 'Polo di città - Palazzo Consolati - via S. Maria Maddalena, 1',
	// 	sede_des_en: null,
	// 	sede_cod: '1721',
	// 	modalita_didattica_cod: 'C',
	// 	modalita_didattica_des_it: 'Convenzionale',
	// 	modalita_didattica_des_en: '',
	// 	data_inizio_periodo_didattico: '16/09/2024',
	// 	data_fine_periodo_didattico: '20/12/2024',
	// 	isPart: false,
	// 	isMod: true,
	// 	titolari: [],
	// 	responsabili: [
	// 		{
	// 			cod: '0182805',
	// 			hyperlink: '',
	// 			matricola: '0182805',
	// 			des: 'TOMMASINO FRANCESCO',
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		}
	// 	],
	// 	docenti: [
	// 		{
	// 			cod: '0182805',
	// 			hyperlink: '',
	// 			matricola: '0182805',
	// 			des: 'TOMMASINO FRANCESCO',
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		}
	// 	],
	// 	frequenza_it: 'Non obbligatoria',
	// 	frequenza_en: 'Not mandatory',
	// 	crediti: 6,
	// 	oreMinimeFrequenza: '0',
	// 	durata: {
	// 		totale: 70,
	// 		tipo: [
	// 			{
	// 				tipo_durata_cod: 'ESE',
	// 				tipo_durata_des_it: 'Esercitazione',
	// 				tipo_durata_des_en: 'Practical',
	// 				valore: 30
	// 			},
	// 			{
	// 				tipo_durata_cod: 'LEZ',
	// 				tipo_durata_des_it: 'Lezione',
	// 				tipo_durata_des_en: 'Lecture',
	// 				valore: 40
	// 			}
	// 		]
	// 	},
	// 	tipo_it: 'Base',
	// 	tipo_en: 'Basic',
	// 	ambito_it: 'Discipline generali per la formazione del medico',
	// 	ambito_en: 'General Studies for Medical Training',
	// 	ambitoInterclasse_it: '',
	// 	ambitoInterclasse_en: '',
	// 	intercla_tipo_it: '',
	// 	intercla_tipo_en: '',
	// 	metodi_didattici_it: 'Esercitazione, Lezione, Laboratorio',
	// 	metodi_didattici_en: 'Practical, Lecture, Laboratory',
	// 	ssd: 'FIS/01',
	// 	udCod: '110000/1',
	// 	mutuaDa: null,
	// 	mutuazioneFlg: 0,
	// 	modulo_di: {
	// 		cod: '50517_648398_94543',
	// 		adCod: '110000',
	// 		des_it: 'Fisica e informatica',
	// 		des_en: 'Physics and Computer Science'
	// 	},
	// 	dataCreazione: '2025-01-11T03:22:25.566Z',
	// 	dataModifica: '2025-01-11T13:13:15.462Z',
	// 	utenteCreazioneId: '628dcad94933690018ad21bd',
	// 	utenteModificaId: '628dcad94933690018ad21bd'
	// });

	// await Course.importFrom({
	// 	ate_cod: 'unitn',
	// 	corso_anno: 1,
	// 	corso_des_it: 'MEDICINA E CHIRURGIA',
	// 	corso_des_en: 'MEDICINE AND SURGERY',
	// 	corso_cod: '10739',
	// 	cdsCod: '1001S',
	// 	corso_aa: '2024',
	// 	corso_ccMasterFlg: '0',
	// 	corso_ccRaggrCod: '',
	// 	tipo_corso_cod: 'LM6',
	// 	tipo_corso_des_it: 'Laurea Magistrale Ciclo Unico 6 anni',
	// 	tipo_corso_des_en: 'Laurea Magistrale Ciclo Unico 6 anni',
	// 	dip_cod: '23',
	// 	dip_des_it: 'Centro Interdipartimentale di Scienze Mediche - CISMed',
	// 	dip_des_en: null,
	// 	corso_percorso_des_it: 'Schema di piano Medicina e Chirurgia 2024',
	// 	corso_percorso_des_en: 'Schema di piano Medicina e Chirurgia 2024',
	// 	corso_percorso_id: 50517,
	// 	corso_percorso_cod: 'PDS0-2020',
	// 	des_it: 'Fisica e informatica',
	// 	des_en: 'Physics and Computer Science',
	// 	cod: '50517_648398_94543',
	// 	adCod: '110000',
	// 	aa: '2024',
	// 	ordinamento_aa: 2020,
	// 	schemaCod: 'CC1001S-24',
	// 	schemaId: 8628,
	// 	af_percorso_id: '50517',
	// 	af_percorso_cod: 'PDS0-2020',
	// 	adPadre: {},
	// 	adFiglie: [],
	// 	annoCorsoAnticipo: undefined,
	// 	statoAttivita: 'B',
	// 	tipoEsaCod: 'S',
	// 	tipoEsaDes_it: 'Scritto',
	// 	tipoEsaDes_en: 'Scritto',
	// 	valutazione_it: 'Voto Finale',
	// 	valutazione_en: 'Final grade',
	// 	linkTeledidattica: '',
	// 	tipo_ins_cod: '',
	// 	tipo_ins_des_it: '',
	// 	tipo_ins_des_en: '',
	// 	lingua_des_it: 'Italiano',
	// 	lingua_des_en: 'Italian',
	// 	lingua_cod: 'ita',
	// 	periodo_didattico_it: 'Primo Semestre',
	// 	periodo_didattico_en: 'First semester',
	// 	sede_des_it: 'Polo di città - Palazzo Consolati - via S. Maria Maddalena, 1',
	// 	sede_des_en: 'Polo di città - Palazzo Consolati - via S. Maria Maddalena, 1',
	// 	sede_cod: '1721',
	// 	modalita_didattica_cod: 'C',
	// 	modalita_didattica_des_it: 'Convenzionale',
	// 	modalita_didattica_des_en: 'Convenzionale',
	// 	data_inizio_periodo_didattico: '16/09/2024',
	// 	data_fine_periodo_didattico: '20/12/2024',
	// 	isPart: false,
	// 	isMod: true,
	// 	titolari: [],
	// 	responsabili: [
	// 		{
	// 			cod: '0182805',
	// 			hyperlink: '',
	// 			matricola: '0182805',
	// 			des: 'TOMMASINO FRANCESCO',
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		},
	// 		{
	// 			cod: '0004834',
	// 			hyperlink: '',
	// 			matricola: '0004834',
	// 			des: "D'ANDREA VINCENZO",
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		}
	// 	],
	// 	docenti: [
	// 		{
	// 			cod: '0182805',
	// 			hyperlink: '',
	// 			matricola: '0182805',
	// 			des: 'TOMMASINO FRANCESCO',
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		},
	// 		{
	// 			cod: '0004834',
	// 			hyperlink: '',
	// 			matricola: '0004834',
	// 			des: "D'ANDREA VINCENZO",
	// 			aa: '2024',
	// 			respDidFlg: 1,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		},
	// 		{
	// 			cod: '0000642',
	// 			hyperlink: '',
	// 			matricola: '0000642',
	// 			des: "CHISTE' NICOLA",
	// 			aa: '2024',
	// 			respDidFlg: 0,
	// 			titolareFlg: false,
	// 			lezioneFlg: true,
	// 			raggruppamentoDocente: {
	// 				coperturaCod: 'AS',
	// 				coperturaDes_it: 'Assistenti',
	// 				coperturaDes_en: 'Assistants'
	// 			},
	// 			urlUnifind: '',
	// 			domPartCod: ''
	// 		}
	// 	],
	// 	frequenza_it: 'Non obbligatoria',
	// 	frequenza_en: 'Not mandatory',
	// 	crediti: 10,
	// 	oreMinimeFrequenza: '0',
	// 	durata: {
	// 		totale: 120,
	// 		tipo: [
	// 			{
	// 				tipo_durata_cod: 'ESE',
	// 				tipo_durata_des_it: 'Esercitazione',
	// 				tipo_durata_des_en: 'Practical',
	// 				valore: 30
	// 			},
	// 			{
	// 				tipo_durata_cod: 'LEZ',
	// 				tipo_durata_des_it: 'Lezione',
	// 				tipo_durata_des_en: 'Lecture',
	// 				valore: 60
	// 			},
	// 			{
	// 				tipo_durata_cod: 'LAB',
	// 				tipo_durata_des_it: 'Laboratorio',
	// 				tipo_durata_des_en: 'Laboratory',
	// 				valore: 30
	// 			}
	// 		]
	// 	},
	// 	tipo_it: 'Base, Caratterizzante',
	// 	tipo_en: 'Basic, Core',
	// 	ambito_it:
	// 		'Discipline generali per la formazione del medico, Inglese scientifico e abilità linguistiche, informatiche e relazionali, pedagogia medica, tecnologie avanzate e a distanza di informazione e comunicazione',
	// 	ambito_en:
	// 		'General Studies for Medical Training, Scientific English and Linguistic, Information technology and Relational Skills, Medical Pedagogy, advanced and virtual technologies for Education and Communication',
	// 	ambitoInterclasse_it: '',
	// 	ambitoInterclasse_en: '',
	// 	intercla_tipo_it: '',
	// 	intercla_tipo_en: '',
	// 	metodi_didattici_it: 'Esercitazione, Lezione, Laboratorio',
	// 	metodi_didattici_en: 'Practical, Lecture, Laboratory',
	// 	ssd: 'FIS/07',
	// 	moduli: [
	// 		{
	// 			cod: '110000/1',
	// 			aa: '2024',
	// 			des_it: 'Fisica medica',
	// 			des_en: 'Physics for Medicine',
	// 			adCod: '110000',
	// 			udCod: '110000/1',
	// 			periodo_didattico_it: 'Primo Semestre',
	// 			periodo_didattico_en: 'First semester',
	// 			data_inizio_periodo_didattico: '16/09/2024',
	// 			data_fine_periodo_didattico: '20/12/2024',
	// 			lingua_des_it: 'Italiano',
	// 			lingua_des_en: 'Italian',
	// 			lingua_cod: 'ita',
	// 			modalita_didattica_cod: 'C',
	// 			modalita_didattica_des_it: 'Convenzionale',
	// 			modalita_didattica_des_en: '',
	// 			sede_des_it: 'Polo di città - Palazzo Consolati - via S. Maria Maddalena, 1',
	// 			sede_des_en: null,
	// 			sede_cod: '1721',
	// 			tipo_it: 'Base',
	// 			tipo_en: 'Basic',
	// 			intercla_tipo_it: '',
	// 			intercla_tipo_en: '',
	// 			ambito_it: 'Discipline generali per la formazione del medico',
	// 			ambito_en: 'General Studies for Medical Training',
	// 			ambitoInterclasse_it: '',
	// 			ambitoInterclasse_en: '',
	// 			crediti: 6,
	// 			durata: {
	// 				totale: 70,
	// 				tipo: [
	// 					{
	// 						tipo_durata_cod: 'ESE',
	// 						tipo_durata_des_it: 'Esercitazione',
	// 						tipo_durata_des_en: 'Practical',
	// 						valore: 30
	// 					},
	// 					{
	// 						tipo_durata_cod: 'LEZ',
	// 						tipo_durata_des_it: 'Lezione',
	// 						tipo_durata_des_en: 'Lecture',
	// 						valore: 40
	// 					}
	// 				]
	// 			},
	// 			ssd: '',
	// 			titolari: [],
	// 			responsabili: [
	// 				{
	// 					cod: '0182805',
	// 					hyperlink: '',
	// 					matricola: '0182805',
	// 					des: 'TOMMASINO FRANCESCO',
	// 					aa: '2024',
	// 					respDidFlg: 1,
	// 					titolareFlg: false,
	// 					lezioneFlg: true,
	// 					urlUnifind: '',
	// 					domPartCod: ''
	// 				}
	// 			],
	// 			docenti: [
	// 				{
	// 					cod: '0182805',
	// 					hyperlink: '',
	// 					matricola: '0182805',
	// 					des: 'TOMMASINO FRANCESCO',
	// 					aa: '2024',
	// 					respDidFlg: 1,
	// 					titolareFlg: false,
	// 					lezioneFlg: true,
	// 					urlUnifind: '',
	// 					domPartCod: ''
	// 				}
	// 			],
	// 			isPart: false
	// 		}
	// 	]
	// });

	const response = await resolve(event);
	return response;
};
