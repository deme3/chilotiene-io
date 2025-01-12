export interface JSONRootSchema {
  ate_cod: string;
  corso_anno: string;
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
  dip_cod: string;
  dip_des_it: string;
  dip_des_en: string;
  corso_percorso_des_it: string;
  corso_percorso_des_en: string;
  corso_percorso_id: string;
  corso_percorso_cod: string;
  des_it: string;
  des_en: string;
  cod: string;
  adCod: string;
  aa: string;
  ordinamento_aa: string;
  schemaCod: string;
  schemaId: string;
  af_percorso_id: string;
  af_percorso_cod: string;
  adPadre: object;
  adFiglie: any[];
  annoCorsoAnticipo: string;
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
  sede_des_en: string;
  sede_cod: string;
  modalita_didattica_cod: string;
  modalita_didattica_des_it: string;
  modalita_didattica_des_en: string;
  data_inizio_periodo_didattico: string;
  data_fine_periodo_didattico: string;
  isPart: string;
  isMod: string;
  titolari: string;
  responsabili: string;
  docenti: string;
  frequenza_it: string;
  frequenza_en: string;
  crediti: string;
  oreMinimeFrequenza: string;
  durata: DurataSubSchema;
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
  mutuaDa: string;
  mutuazioneFlg: string;
  modulo_di: ParentCourseSubSchema;
  dataCreazione: string;
  dataModifica: string;
  utenteCreazioneId: string;
  utenteModificaId: string;
}

export interface ParentCourseSubSchema {
  cod: string;
  adCod: string;
  des_it: string;
  des_en: string;
}

export interface DurataSubSchema {
  totale: number;
  tipo: object[];
}

export interface DurataTipoSubSubSchema {
  tipo_durata_cod: 'LEZ' | 'LAB' | 'CIAL' | 'ESE' | 'PRO' | 'PRF' | 'STA' | 'T' | 'SEM' | 'ALT';
  tipo_durata_des_it: string;
  tipo_durata_des_en: string;
  valore: number;
}