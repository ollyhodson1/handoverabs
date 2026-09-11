const { useEffect, useMemo, useRef, useState } = React;
const BLACKBOARD_CODE = '4827';
// Each learning item is answered once. Every occurrence of that item in the
// handover is then shown as completed.
const abbreviations = {
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
        answer: 'Left side weakness',
        accepted: ['left side weakness', 'left sided weakness', 'left-side weakness', 'left-sided weakness'],
        explanation: 'In this handover, LSW means left side weakness: weakness affecting the left side of the body.',
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
        explanation: 'GCS stands for Glasgow Coma Scale, which assesses eye, verbal and motor responses. The scale is scored out of 15, so 15/15 means a full GCS score.',
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
            'oxygen',
            'saturation',
            'saturations',
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
};
const t = (text) => ({ type: 'text', text });
const a = (id, text = abbreviations[id].display) => ({ type: 'abbr', id, text });
const line = (...segments) => segments;
const handoverRows = [
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
            line(t('Urinary incontinence.')),
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
            line(a('disability'), t(' – '), a('neuroObs'), t(' normal, '), a('gcs'), t(' 15/15. Continues to '), a('co'), t(' headaches, pain relief given.')),
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
];
const columnHeadings = [
    { key: 'bedSpace', label: 'Bed space' },
    { key: 'patient', label: 'Pt', headingAbbreviation: 'pt' },
    { key: 'pmh', label: 'PMH/Allergy', headingAbbreviation: 'pmh' },
    { key: 'status', label: 'Current Status' },
    { key: 'nursing', label: 'Nursing notes/outstanding' },
];
const STORAGE_KEY = 'handover-abbreviation-progress-v1';
function normalise(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[’']/g, '')
        .replace(/[-–—/]/g, ' ')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function levenshtein(a, b) {
    const rows = b.length + 1;
    const cols = a.length + 1;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i += 1)
        matrix[i][0] = i;
    for (let j = 0; j < cols; j += 1)
        matrix[0][j] = j;
    for (let i = 1; i < rows; i += 1) {
        for (let j = 1; j < cols; j += 1) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[rows - 1][cols - 1];
}
function answerMatches(input, item) {
    const candidate = normalise(input);
    if (!candidate)
        return { correct: false, exact: false };
    const accepted = [item.answer, ...item.accepted].map(normalise);
    if (accepted.includes(candidate))
        return { correct: true, exact: true };
    let best = Infinity;
    let bestTarget = '';
    for (const target of accepted) {
        const distance = levenshtein(candidate, target);
        if (distance < best) {
            best = distance;
            bestTarget = target;
        }
    }
    const longest = Math.max(candidate.length, bestTarget.length);
    const maxDistance = longest <= 6 ? 1 : longest <= 12 ? 2 : 3;
    const ratio = longest ? best / longest : 1;
    const correct = best <= maxDistance && ratio <= 0.18;
    return { correct, exact: false };
}
function InteractiveTerm({ id, children, completed, onOpen }) {
    return (React.createElement("button", { type: "button", className: `abbr-term ${completed ? 'abbr-term--complete' : ''}`, onClick: () => onOpen(id), "aria-label": `${children}. ${completed ? 'Completed' : 'Click to identify this abbreviation or shorthand.'}`, "data-tooltip": completed ? 'Completed — click to review' : 'Click to identify' },
        React.createElement("strong", null, children),
        completed && React.createElement("span", { className: "inline-tick", "aria-hidden": "true" }, "\u2713")));
}
function Lines({ lines, completed, onOpen }) {
    return (React.createElement("div", { className: "cell-lines" }, lines.map((segments, lineIndex) => (React.createElement("div", { className: "handover-line", key: lineIndex }, segments.map((segment, segmentIndex) => segment.type === 'abbr' ? (React.createElement(InteractiveTerm, { key: `${segment.id}-${lineIndex}-${segmentIndex}`, id: segment.id, completed: completed.has(segment.id), onOpen: onOpen }, segment.text)) : (React.createElement("span", { key: `text-${lineIndex}-${segmentIndex}` }, segment.text))))))));
}
function TermModal({ id, onClose, onComplete, isAlreadyComplete }) {
    const item = abbreviations[id];
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState(isAlreadyComplete ? 'review' : 'idle');
    const [spellingNote, setSpellingNote] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        var _a;
        if (result === 'idle')
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [result]);
    function submit(event) {
        event.preventDefault();
        const match = answerMatches(answer, item);
        if (match.correct) {
            setResult('correct');
            setSpellingNote(!match.exact);
            onComplete(id);
        }
        else {
            setResult('incorrect');
            setSpellingNote(false);
            requestAnimationFrame(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
        }
    }
    const showSuccess = result === 'correct' || result === 'review';
    return (React.createElement("div", { className: "modal-backdrop", role: "presentation", onMouseDown: (e) => e.target === e.currentTarget && onClose() },
        React.createElement("section", { className: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "term-modal-title" },
            React.createElement("button", { type: "button", className: "modal-close", onClick: onClose, "aria-label": "Close" }, "\u00D7"),
            !showSuccess ? (React.createElement(React.Fragment, null,
                React.createElement("p", { className: "eyebrow" }, "Identify the term"),
                React.createElement("h2", { id: "term-modal-title" },
                    "What does ",
                    React.createElement("span", { className: "term-chip" }, item.display),
                    " mean?"),
                React.createElement("p", { className: "modal-intro" }, "Type the full word, phrase or meaning used in this handover."),
                React.createElement("form", { onSubmit: submit },
                    React.createElement("label", { htmlFor: "answer", className: "sr-only" }, "Your answer"),
                    React.createElement("input", { ref: inputRef, id: "answer", className: `answer-input ${result === 'incorrect' ? 'answer-input--error' : ''}`, value: answer, onChange: (e) => {
                            setAnswer(e.target.value);
                            if (result === 'incorrect')
                                setResult('idle');
                        }, autoComplete: "off", spellCheck: "false", placeholder: "Type your answer\u2026" }),
                    result === 'incorrect' && (React.createElement("p", { className: "feedback feedback--error", role: "alert" }, "Not quite. Check the term and try again.")),
                    React.createElement("button", { type: "submit", className: "primary-button" }, "Check answer")))) : (React.createElement("div", { className: "success-panel" },
                React.createElement("div", { className: "success-icon", "aria-hidden": "true" }, "\u2713"),
                React.createElement("p", { className: "eyebrow" }, result === 'review' ? 'Already completed' : 'Correct'),
                React.createElement("h2", { id: "term-modal-title" },
                    item.display,
                    " = ",
                    item.answer),
                spellingNote && (React.createElement("p", { className: "spelling-note" }, "You had the right meaning. The standard spelling is shown above.")),
                React.createElement("p", { className: "explanation" }, item.explanation),
                React.createElement("button", { type: "button", className: "primary-button", onClick: onClose }, result === 'review' ? 'Close' : 'Close and continue'))))));
}
function CompletionModal({ onClose }) {
    const [copied, setCopied] = useState(false);
    async function copyCode() {
        try {
            await navigator.clipboard.writeText(BLACKBOARD_CODE);
            setCopied(true);
        }
        catch {
            setCopied(false);
        }
    }
    return (React.createElement("div", { className: "modal-backdrop modal-backdrop--completion", role: "presentation" },
        React.createElement("section", { className: "modal completion-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "complete-title" },
            React.createElement("div", { className: "completion-badge", "aria-hidden": "true" }, "\u2713"),
            React.createElement("p", { className: "eyebrow" }, "Activity complete"),
            React.createElement("h2", { id: "complete-title" }, "You found every abbreviation and shorthand term."),
            React.createElement("p", null, "Enter this four-digit code into Blackboard:"),
            React.createElement("div", { className: "code-box", "aria-label": `Blackboard completion code ${BLACKBOARD_CODE}` }, BLACKBOARD_CODE),
            React.createElement("button", { type: "button", className: "primary-button", onClick: copyCode }, copied ? 'Code copied' : 'Copy code'),
            React.createElement("button", { type: "button", className: "text-button", onClick: onClose }, "Return to handover"))));
}
function App() {
    const allIds = useMemo(() => Object.keys(abbreviations), []);
    const [completed, setCompleted] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return new Set(stored.filter((id) => allIds.includes(id)));
        }
        catch {
            return new Set();
        }
    });
    const [activeId, setActiveId] = useState(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [hasShownCompletion, setHasShownCompletion] = useState(false);
    const total = allIds.length;
    const done = completed.size;
    const percentage = Math.round((done / total) * 100);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    }, [completed]);
    useEffect(() => {
        if (done === total && total > 0 && !activeId && !hasShownCompletion) {
            setShowCompletion(true);
            setHasShownCompletion(true);
        }
    }, [done, total, activeId, hasShownCompletion]);
    function complete(id) {
        setCompleted((previous) => {
            const next = new Set(previous);
            next.add(id);
            return next;
        });
    }
    function resetProgress() {
        if (!window.confirm('Reset all completed abbreviations and start again?'))
            return;
        setCompleted(new Set());
        setActiveId(null);
        setShowCompletion(false);
        setHasShownCompletion(false);
        localStorage.removeItem(STORAGE_KEY);
    }
    return (React.createElement("div", { className: "app-shell" },
        React.createElement("header", { className: "page-header" },
            React.createElement("div", { className: "header-inner" },
                React.createElement("div", null,
                    React.createElement("p", { className: "kicker" }, "SPL 2 \u00B7 Handover"),
                    React.createElement("h1", null, "Abbreviation Challenge"),
                    React.createElement("p", { className: "header-copy" }, "Find and identify every abbreviation and piece of clinical shorthand in the handover.")),
                React.createElement("div", { className: "progress-card", "aria-label": `${done} of ${total} terms completed` },
                    React.createElement("div", { className: "progress-topline" },
                        React.createElement("span", null, "Progress"),
                        React.createElement("strong", null,
                            done,
                            "/",
                            total)),
                    React.createElement("div", { className: "progress-track", "aria-hidden": "true" },
                        React.createElement("div", { className: "progress-fill", style: { width: `${percentage}%` } })),
                    React.createElement("span", { className: "progress-percent" },
                        percentage,
                        "% complete")))),
        React.createElement("main", { className: "main-content" },
            React.createElement("section", { className: "instructions", "aria-labelledby": "instructions-title" },
                React.createElement("div", { className: "instruction-icon", "aria-hidden": "true" }, "i"),
                React.createElement("div", null,
                    React.createElement("h2", { id: "instructions-title" }, "How to complete the activity"),
                    React.createElement("p", null,
                        "Abbreviations and shorthand are shown in ",
                        React.createElement("strong", null, "bold"),
                        ". Hover or focus on a term, then click it and type what it means. Small spelling mistakes are accepted when your meaning is clear, but you\u2019ll still be shown the standard spelling."))),
            React.createElement("section", { className: "handover-section", "aria-labelledby": "handover-title" },
                React.createElement("div", { className: "section-heading-row" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "eyebrow" }, "Simulation document"),
                        React.createElement("h2", { id: "handover-title" }, "Handover sheet")),
                    React.createElement("button", { type: "button", className: "reset-button", onClick: resetProgress }, "Reset progress")),
                React.createElement("div", { className: "table-wrap" },
                    React.createElement("table", { className: "handover-table" },
                        React.createElement("thead", null,
                            React.createElement("tr", null, columnHeadings.map((heading) => (React.createElement("th", { key: heading.key, scope: "col" },
                                heading.headingAbbreviation ? (React.createElement(InteractiveTerm, { id: heading.headingAbbreviation, completed: completed.has(heading.headingAbbreviation), onOpen: setActiveId }, heading.label.split('/')[0])) : (heading.label),
                                heading.headingAbbreviation && heading.label.includes('/') && (React.createElement("span", null,
                                    "/",
                                    heading.label.split('/').slice(1).join('/')))))))),
                        React.createElement("tbody", null, handoverRows.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex }, columnHeadings.map((heading) => (React.createElement("td", { key: heading.key, "data-label": heading.label },
                            React.createElement(Lines, { lines: row[heading.key], completed: completed, onOpen: setActiveId })))))))))),
                React.createElement("p", { className: "simulation-warning" }, "SIMULATION DOCUMENT \u2013 NOT FOR REAL PATIENT CARE"))),
        React.createElement("footer", { className: "footer" },
            React.createElement("p", null,
                "Complete all ",
                total,
                " learning items to reveal the Blackboard code.")),
        activeId && (React.createElement(TermModal, { id: activeId, isAlreadyComplete: completed.has(activeId), onComplete: complete, onClose: () => setActiveId(null) })),
        showCompletion && React.createElement(CompletionModal, { onClose: () => setShowCompletion(false) })));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)));
