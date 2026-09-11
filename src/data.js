export const BLACKBOARD_CODE = '4827'

// Each learning item is answered once. Every occurrence of that item in the
// handover is then shown as completed.
export const abbreviations = {
  pt: {
    display: 'Pt',
    answer: 'Patient',
    accepted: ['patient'],
    explanation: 'Pt is a common shorthand for patient.',
  },
  pmh: {
    display: 'PMH',
    answer: 'Past medical history',
    accepted: ['past medical history', 'previous medical history'],
    explanation: 'PMH summarises relevant previous or ongoing health conditions in a patient’s medical history.',
  },
  yo: {
    display: 'y/o',
    answer: 'Years old',
    accepted: ['years old', 'year old', 'years of age', 'year of age'],
    explanation: 'y/o is used to state a person’s age in years.',
  },
  queryAlzheimers: {
    display: '?Alzheimer’s',
    answer: 'Possible / suspected Alzheimer’s',
    accepted: [
      'possible alzheimers',
      'possible alzheimer’s',
      'suspected alzheimers',
      'suspected alzheimer’s',
      'query alzheimers',
      'query alzheimer’s',
    ],
    explanation: 'A question mark before a diagnosis can indicate that the diagnosis is being queried, considered or suspected rather than confirmed.',
  },
  fourMonths: {
    display: '4/12',
    answer: '4 months',
    accepted: ['4 months', 'four months', '4 months ago', 'four months ago'],
    explanation: 'In this style of clinical shorthand, /12 refers to months, so 4/12 means four months.',
  },
  htn: {
    display: 'HTN',
    answer: 'Hypertension',
    accepted: ['hypertension', 'high blood pressure'],
    explanation: 'HTN is shorthand for hypertension, meaning persistently raised blood pressure.',
  },
  dnr: {
    display: 'DNR',
    answer: 'Do not resuscitate',
    accepted: ['do not resuscitate', 'do not resuscitation'],
    explanation: 'DNR means do not resuscitate. It indicates that resuscitation should not be attempted if the person has a cardiac or respiratory arrest.',
  },
  cva: {
    display: 'CVA',
    answer: 'Cerebrovascular accident',
    accepted: ['cerebrovascular accident', 'stroke'],
    explanation: 'CVA stands for cerebrovascular accident, a term used for a stroke.',
  },
  lsw: {
    display: 'LSW',
    answer: 'Last seen well',
    accepted: ['last seen well', 'last seen well time'],
    explanation: 'LSW means last seen well: the last time the person was known to be at their neurological baseline, which is important when assessing acute stroke.',
  },
  ui: {
    display: 'UI',
    answer: 'Urinary incontinence',
    accepted: ['urinary incontinence', 'urine incontinence'],
    explanation: 'In this handover, UI means urinary incontinence: involuntary leakage of urine.',
  },
  airway: {
    display: 'A',
    answer: 'Airway',
    accepted: ['airway'],
    explanation: 'A is Airway, the first part of an ABCDE assessment.',
  },
  breathing: {
    display: 'B',
    answer: 'Breathing',
    accepted: ['breathing'],
    explanation: 'B is Breathing, the second part of an ABCDE assessment.',
  },
  circulation: {
    display: 'C',
    answer: 'Circulation',
    accepted: ['circulation'],
    explanation: 'C is Circulation, the third part of an ABCDE assessment.',
  },
  disability: {
    display: 'D',
    answer: 'Disability',
    accepted: ['disability'],
    explanation: 'D is Disability, the neurological assessment stage of an ABCDE assessment.',
  },
  exposure: {
    display: 'E',
    answer: 'Exposure',
    accepted: ['exposure'],
    explanation: 'E is Exposure, the final stage of an ABCDE assessment, involving further examination while maintaining dignity and temperature.',
  },
  sats: {
    display: 'Sats',
    answer: 'Oxygen saturations',
    accepted: ['oxygen saturations', 'oxygen saturation', 'saturations', 'saturation'],
    explanation: 'Sats is shorthand for oxygen saturation: the percentage of haemoglobin carrying oxygen.',
  },
  rr: {
    display: 'RR',
    answer: 'Respiratory rate',
    accepted: ['respiratory rate', 'respiration rate', 'respirations rate'],
    explanation: 'RR means respiratory rate: the number of breaths taken per minute.',
  },
  news: {
    display: 'NEWS',
    answer: 'National Early Warning Score',
    accepted: ['national early warning score', 'national early warning score 2', 'news2'],
    explanation: 'NEWS is a physiological scoring system used to help identify and respond to acute deterioration.',
  },
  inSitu: {
    display: 'in situ',
    answer: 'In place / in position',
    accepted: ['in place', 'in position', 'situated in place', 'left in place'],
    explanation: 'In situ is a Latin phrase meaning that something is in its intended place or position.',
  },
  cath: {
    display: 'cath',
    answer: 'Catheter',
    accepted: ['catheter', 'urinary catheter'],
    explanation: 'cath is shorthand for catheter. Here it refers to the drainage bag connected to the urinary device.',
  },
  resus: {
    display: 'resus',
    answer: 'Resuscitation',
    accepted: ['resuscitation', 'for resuscitation', 'resuscitate'],
    explanation: 'resus is shorthand for resuscitation. “For resus” indicates that resuscitation would be attempted if clinically required.',
  },
  abx: {
    display: 'ABx',
    answer: 'Antibiotics',
    accepted: ['antibiotics', 'antibiotic'],
    explanation: 'ABx is a common shorthand for antibiotics.',
  },
  hr: {
    display: 'HR',
    answer: 'Heart rate',
    accepted: ['heart rate', 'heart-rate'],
    explanation: 'HR means heart rate: the number of heart beats per minute.',
  },
  neuroObs: {
    display: 'Neuro-obs',
    answer: 'Neurological observations',
    accepted: ['neurological observations', 'neurologic observations', 'neuro observations'],
    explanation: 'Neuro-obs means neurological observations: structured checks used to assess and monitor neurological function.',
  },
  gcs: {
    display: 'GCS',
    answer: 'Glasgow Coma Scale',
    accepted: ['glasgow coma scale', 'glasgow coma score'],
    explanation: 'GCS stands for Glasgow Coma Scale, which assesses eye, verbal and motor responses.',
  },
  fifteenFifteen: {
    display: '15/15',
    answer: 'Maximum / full GCS score',
    accepted: [
      'maximum gcs score',
      'full gcs score',
      'normal gcs score',
      'gcs score of 15 out of 15',
      '15 out of 15',
      'full score',
      'maximum score',
    ],
    explanation: 'GCS is scored out of 15. A documented score of 15/15 is the maximum possible total score.',
  },
  co: {
    display: 'c/o',
    answer: 'Complains of',
    accepted: ['complains of', 'complaining of', 'complaint of'],
    explanation: 'c/o is shorthand used to record that a patient complains of, or is complaining of, a symptom.',
  },
  nkda: {
    display: 'NKDA',
    answer: 'No known drug allergies',
    accepted: ['no known drug allergies', 'no known drug allergy'],
    explanation: 'NKDA means no known drug allergies.',
  },
  abdo: {
    display: 'abdo',
    answer: 'Abdomen / abdominal',
    accepted: ['abdomen', 'abdominal', 'abdomen pain', 'abdominal pain'],
    explanation: 'abdo is informal shorthand for abdomen or abdominal.',
  },
  spo2: {
    display: 'SpO2',
    answer: 'Peripheral oxygen saturation',
    accepted: [
      'peripheral oxygen saturation',
      'peripheral capillary oxygen saturation',
      'oxygen saturation',
      'oxygen saturations',
    ],
    explanation: 'SpO₂ is the peripheral oxygen saturation measured using pulse oximetry.',
  },
  neuro: {
    display: 'neuro',
    answer: 'Neurological',
    accepted: ['neurological', 'neurologic', 'neurology'],
    explanation: 'neuro is shorthand for neurological or neurology-related.',
  },
  uc: {
    display: 'UC',
    answer: 'Ulcerative colitis',
    accepted: ['ulcerative colitis'],
    explanation: 'In this patient’s past medical history, UC means ulcerative colitis.',
  },
  postop: {
    display: 'Post-op',
    answer: 'Post-operative',
    accepted: ['post operative', 'postoperative', 'post-operation', 'after operation', 'after surgery'],
    explanation: 'Post-op means post-operative: the period after an operation or surgical procedure.',
  },
  indep: {
    display: 'Indep',
    answer: 'Independent',
    accepted: ['independent', 'independently'],
    explanation: 'Indep is shorthand for independent, here referring to the patient’s usual mobility or ability.',
  },
}

const t = (text) => ({ type: 'text', text })
const a = (id, text = abbreviations[id].display) => ({ type: 'abbr', id, text })
const line = (...segments) => segments

export const handoverRows = [
  {
    bedSpace: [line(t('Bay 1')), line(t('Bed 1'))],
    patient: [line(t('Dennis Brown')), line(t('64 '), a('yo'))],
    pmh: [
      line(t('Diagnosed with Early Onset Dementia ('), a('queryAlzheimers'), t(') '), a('fourMonths')),
      line(a('htn'), t('.')),
      line(t('Allergy: kiwi fruit.')),
      line(a('dnr'), t('.')),
    ],
    status: [
      line(t('Ischemic '), a('cva'), t('.')),
      line(a('lsw')),
      line(t('Dysphagia.')),
      line(t('Aphasia.')),
      line(a('ui'), t('.')),
    ],
    nursing: [
      line(a('airway'), t(' – Patent.')),
      line(a('breathing'), t(' – '), a('sats'), t(' and '), a('rr'), t(' normal.')),
      line(a('circulation'), t(' – '), a('news'), t(' 0.')),
      line(a('disability'), t(' – Due to recent '), a('cva'), t(', struggling to produce speech. Gets easily agitated, likely due to frustration.')),
      line(a('exposure'), t(' – Skin intact. Has conveen '), a('inSitu'), t(', draining into a '), a('cath'), t(' bag.')),
    ],
  },
  {
    bedSpace: [line(t('Bay 1')), line(t('Bed 2'))],
    patient: [line(t('James Anderson')), line(t('55 '), a('yo'))],
    pmh: [
      line(t('Reoccurring headaches.')),
      line(t('Depression.')),
      line(t('Allergy: penicillin.')),
      line(t('For '), a('resus'), t('.')),
    ],
    status: [
      line(t('Chest infection.')),
      line(t('Admitted for '), a('abx'), t('.')),
    ],
    nursing: [
      line(a('airway'), t(' – Patent.')),
      line(a('breathing'), t(' – '), a('sats'), t(' 94%, '), a('rr'), t(' normal.')),
      line(a('circulation'), t(' – '), a('news'), t(' 2 due to '), a('hr'), t(' slightly elevated and '), a('sats'), t(' below 95%.')),
      line(a('disability'), t(' – '), a('neuroObs'), t(' normal, '), a('gcs'), t(' '), a('fifteenFifteen'), t('. Continues to '), a('co'), t(' headaches, pain relief given.')),
      line(a('exposure'), t(' – Skin intact.')),
    ],
  },
  {
    bedSpace: [line(t('Bay 2')), line(t('Bed 1'))],
    patient: [line(t('Asim Khan')), line(t('32 '), a('yo'))],
    pmh: [
      line(t('No '), a('pmh')),
      line(t('Normally fit and well.')),
      line(a('nkda')),
      line(t('For '), a('resus'), t('.')),
    ],
    status: [
      line(t('Sudden onset '), a('abdo'), t(' pain')),
      line(t('tenderness in the lower '), a('abdo'), t('.')),
      line(t('Dehydration.')),
    ],
    nursing: [
      line(a('airway'), t(' – Patent.')),
      line(a('breathing'), t(' – '), a('spo2'), t(' normal, '), a('rr'), t(' normal.')),
      line(a('circulation'), t(' – '), a('news'), t(' 0.')),
      line(a('disability'), t(' – No changes in '), a('neuro'), t(' status.')),
      line(a('exposure'), t(' – Skin intact. Still having pain in lower '), a('abdo'), t(', pain relief given. No signs of redness or swelling in the area.')),
    ],
  },
  {
    bedSpace: [line(t('Bay 2')), line(t('Bed 2'))],
    patient: [line(t('Alex Brown')), line(t('18 '), a('yo'))],
    pmh: [
      line(a('uc')),
      line(t('Depression.')),
      line(a('nkda')),
      line(t('For '), a('resus'), t('.')),
    ],
    status: [
      line(t('Recent emergency laparotomy, which included the formation of a colostomy.')),
      line(a('postop'), t(' pain.')),
      line(t('Reduced nutritional intake.')),
    ],
    nursing: [
      line(a('airway'), t(' – Patent.')),
      line(a('breathing'), t(' – '), a('spo2'), t(' 97%, '), a('rr'), t(' normal.')),
      line(a('circulation'), t(' – '), a('news'), t(' 1 due to '), a('hr'), t(' elevated.')),
      line(a('disability'), t(' – no change to '), a('neuro'), t(' status. '), a('indep'), t(', but needing some assistant mobilising due to pain.')),
      line(a('exposure'), t(' – No bleeding noted around the stoma. Skin around stoma little bit red and swollen, please monitor. Stoma is pink and has been producing soft stool. Nurses have been doing cares so far, but Alex is needing to be encouraged to start doing cares herself.')),
    ],
  },
]

export const columnHeadings = [
  { key: 'bedSpace', label: 'Bed space' },
  { key: 'patient', label: 'Pt', headingAbbreviation: 'pt' },
  { key: 'pmh', label: 'PMH/Allergy', headingAbbreviation: 'pmh' },
  { key: 'status', label: 'Current Status' },
  { key: 'nursing', label: 'Nursing notes/outstanding' },
]
