import { useEffect, useMemo, useRef, useState } from 'react'
import { abbreviations, BLACKBOARD_CODE, columnHeadings, handoverRows } from './data.js'

const STORAGE_KEY = 'handover-abbreviation-progress-v1'

function normalise(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[-–—/]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a, b) {
  const rows = b.length + 1
  const cols = a.length + 1
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[rows - 1][cols - 1]
}

function answerMatches(input, item) {
  const candidate = normalise(input)
  if (!candidate) return { correct: false, exact: false }

  const accepted = [item.answer, ...item.accepted].map(normalise)
  if (accepted.includes(candidate)) return { correct: true, exact: true }

  let best = Infinity
  let bestTarget = ''
  for (const target of accepted) {
    const distance = levenshtein(candidate, target)
    if (distance < best) {
      best = distance
      bestTarget = target
    }
  }

  const longest = Math.max(candidate.length, bestTarget.length)
  const maxDistance = longest <= 6 ? 1 : longest <= 12 ? 2 : 3
  const ratio = longest ? best / longest : 1
  const correct = best <= maxDistance && ratio <= 0.18
  return { correct, exact: false }
}

function InteractiveTerm({ id, children, completed, onOpen }) {
  return (
    <button
      type="button"
      className={`abbr-term ${completed ? 'abbr-term--complete' : ''}`}
      onClick={() => onOpen(id)}
      aria-label={`${children}. ${completed ? 'Completed' : 'Click to identify this abbreviation or shorthand.'}`}
      data-tooltip={completed ? 'Completed — click to review' : 'Click to identify'}
    >
      <strong>{children}</strong>
      {completed && <span className="inline-tick" aria-hidden="true">✓</span>}
    </button>
  )
}

function Lines({ lines, completed, onOpen }) {
  return (
    <div className="cell-lines">
      {lines.map((segments, lineIndex) => (
        <div className="handover-line" key={lineIndex}>
          {segments.map((segment, segmentIndex) =>
            segment.type === 'abbr' ? (
              <InteractiveTerm
                key={`${segment.id}-${lineIndex}-${segmentIndex}`}
                id={segment.id}
                completed={completed.has(segment.id)}
                onOpen={onOpen}
              >
                {segment.text}
              </InteractiveTerm>
            ) : (
              <span key={`text-${lineIndex}-${segmentIndex}`}>{segment.text}</span>
            ),
          )}
        </div>
      ))}
    </div>
  )
}

function TermModal({ id, onClose, onComplete, isAlreadyComplete }) {
  const item = abbreviations[id]
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(isAlreadyComplete ? 'review' : 'idle')
  const [spellingNote, setSpellingNote] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (result === 'idle') inputRef.current?.focus()
  }, [result])

  function submit(event) {
    event.preventDefault()
    const match = answerMatches(answer, item)
    if (match.correct) {
      setResult('correct')
      setSpellingNote(!match.exact)
      onComplete(id)
    } else {
      setResult('incorrect')
      setSpellingNote(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  const showSuccess = result === 'correct' || result === 'review'

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="term-modal-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>

        {!showSuccess ? (
          <>
            <p className="eyebrow">Identify the term</p>
            <h2 id="term-modal-title">What does <span className="term-chip">{item.display}</span> mean?</h2>
            <p className="modal-intro">Type the full word, phrase or meaning used in this handover.</p>

            <form onSubmit={submit}>
              <label htmlFor="answer" className="sr-only">Your answer</label>
              <input
                ref={inputRef}
                id="answer"
                className={`answer-input ${result === 'incorrect' ? 'answer-input--error' : ''}`}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value)
                  if (result === 'incorrect') setResult('idle')
                }}
                autoComplete="off"
                spellCheck="false"
                placeholder="Type your answer…"
              />
              {result === 'incorrect' && (
                <p className="feedback feedback--error" role="alert">Not quite. Check the term and try again.</p>
              )}
              <button type="submit" className="primary-button">Check answer</button>
            </form>
          </>
        ) : (
          <div className="success-panel">
            <div className="success-icon" aria-hidden="true">✓</div>
            <p className="eyebrow">{result === 'review' ? 'Already completed' : 'Correct'}</p>
            <h2 id="term-modal-title">{item.display} = {item.answer}</h2>
            {spellingNote && (
              <p className="spelling-note">You had the right meaning. The standard spelling is shown above.</p>
            )}
            <p className="explanation">{item.explanation}</p>
            <button type="button" className="primary-button" onClick={onClose}>
              {result === 'review' ? 'Close' : 'Close and continue'}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function CompletionModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(BLACKBOARD_CODE)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="modal-backdrop modal-backdrop--completion" role="presentation">
      <section className="modal completion-modal" role="dialog" aria-modal="true" aria-labelledby="complete-title">
        <div className="completion-badge" aria-hidden="true">✓</div>
        <p className="eyebrow">Activity complete</p>
        <h2 id="complete-title">You found every abbreviation and shorthand term.</h2>
        <p>Enter this four-digit code into Blackboard:</p>
        <div className="code-box" aria-label={`Blackboard completion code ${BLACKBOARD_CODE}`}>{BLACKBOARD_CODE}</div>
        <button type="button" className="primary-button" onClick={copyCode}>{copied ? 'Code copied' : 'Copy code'}</button>
        <button type="button" className="text-button" onClick={onClose}>Return to handover</button>
      </section>
    </div>
  )
}

function App() {
  const allIds = useMemo(() => Object.keys(abbreviations), [])
  const [completed, setCompleted] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return new Set(stored.filter((id) => allIds.includes(id)))
    } catch {
      return new Set()
    }
  })
  const [activeId, setActiveId] = useState(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [hasShownCompletion, setHasShownCompletion] = useState(false)

  const total = allIds.length
  const done = completed.size
  const percentage = Math.round((done / total) * 100)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  useEffect(() => {
    if (done === total && total > 0 && !activeId && !hasShownCompletion) {
      setShowCompletion(true)
      setHasShownCompletion(true)
    }
  }, [done, total, activeId, hasShownCompletion])

  function complete(id) {
    setCompleted((previous) => {
      const next = new Set(previous)
      next.add(id)
      return next
    })
  }

  function resetProgress() {
    if (!window.confirm('Reset all completed abbreviations and start again?')) return
    setCompleted(new Set())
    setActiveId(null)
    setShowCompletion(false)
    setHasShownCompletion(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="header-inner">
          <div>
            <p className="kicker">SPL 2 · Handover</p>
            <h1>Abbreviation Challenge</h1>
            <p className="header-copy">Find and identify every abbreviation and piece of clinical shorthand in the handover.</p>
          </div>
          <div className="progress-card" aria-label={`${done} of ${total} terms completed`}>
            <div className="progress-topline">
              <span>Progress</span>
              <strong>{done}/{total}</strong>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: `${percentage}%` }} />
            </div>
            <span className="progress-percent">{percentage}% complete</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="instructions" aria-labelledby="instructions-title">
          <div className="instruction-icon" aria-hidden="true">i</div>
          <div>
            <h2 id="instructions-title">How to complete the activity</h2>
            <p>
              Abbreviations and shorthand are shown in <strong>bold</strong>. Hover or focus on a term, then click it and type what it means. Small spelling mistakes are accepted when your meaning is clear, but you’ll still be shown the standard spelling.
            </p>
          </div>
        </section>

        <section className="handover-section" aria-labelledby="handover-title">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Simulation document</p>
              <h2 id="handover-title">Handover sheet</h2>
            </div>
            <button type="button" className="reset-button" onClick={resetProgress}>Reset progress</button>
          </div>

          <div className="table-wrap">
            <table className="handover-table">
              <thead>
                <tr>
                  {columnHeadings.map((heading) => (
                    <th key={heading.key} scope="col">
                      {heading.headingAbbreviation ? (
                        <InteractiveTerm
                          id={heading.headingAbbreviation}
                          completed={completed.has(heading.headingAbbreviation)}
                          onOpen={setActiveId}
                        >
                          {heading.label.split('/')[0]}
                        </InteractiveTerm>
                      ) : (
                        heading.label
                      )}
                      {heading.headingAbbreviation && heading.label.includes('/') && (
                        <span>/{heading.label.split('/').slice(1).join('/')}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {handoverRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columnHeadings.map((heading) => (
                      <td key={heading.key} data-label={heading.label}>
                        <Lines lines={row[heading.key]} completed={completed} onOpen={setActiveId} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="simulation-warning">SIMULATION DOCUMENT – NOT FOR REAL PATIENT CARE</p>
        </section>
      </main>

      <footer className="footer">
        <p>Complete all {total} learning items to reveal the Blackboard code.</p>
      </footer>

      {activeId && (
        <TermModal
          id={activeId}
          isAlreadyComplete={completed.has(activeId)}
          onComplete={complete}
          onClose={() => setActiveId(null)}
        />
      )}

      {showCompletion && <CompletionModal onClose={() => setShowCompletion(false)} />}
    </div>
  )
}

export default App
