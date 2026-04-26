import { useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm.jsx'
import SubmittedCard from './components/SubmittedCard.jsx'

// ─── Controlled inputs ────────────────────────────────────────────────────────
// Every field value lives in React state. Each <input> / <select> / <textarea>
// has a value prop tied to that state and an onChange that updates it.
// React is always the single source of truth — inputs never hold their own state.
//
// ─── Inline validation ────────────────────────────────────────────────────────
// Errors are computed on submit attempt and cleared field-by-field as the user
// types a correction. No third-party library needed for simple cases like this.
//
// ─── Submission lifecycle ────────────────────────────────────────────────────
// submitting → simulates an async POST (setTimeout); success → shows a summary
// card. The form is disabled while submitting to prevent double-clicks.

const EMPTY_FORM = {
  name: '',
  email: '',
  topic: '',
  message: '',
  subscribe: false,
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!fields.topic) {
    errors.topic = 'Please choose a topic.'
  }

  if (!fields.message.trim()) {
    errors.message = 'Message cannot be empty.'
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

function App() {
  // ── Form field values ─────────────────────────────────────────────────────
  const [fields, setFields] = useState(EMPTY_FORM)

  // ── Validation errors (keyed by field name) ───────────────────────────────
  const [errors, setErrors] = useState({})

  // ── Submission lifecycle: 'idle' | 'submitting' | 'success' ──────────────
  const [status, setStatus] = useState('idle')

  // ── The data that was successfully submitted (shown in the summary card) ──
  const [submitted, setSubmitted] = useState(null)

  // ── Generic change handler — works for all input types ───────────────────
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFields((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear the error for this field as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  // ── Submit handler ────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setErrors({})

    // Simulate an async POST request
    setTimeout(() => {
      setSubmitted({ ...fields })
      setStatus('success')
    }, 1200)
  }

  // ── Reset back to the blank form ──────────────────────────────────────────
  function handleReset() {
    setFields(EMPTY_FORM)
    setErrors({})
    setSubmitted(null)
    setStatus('idle')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Forms Demo</h1>
        <p>
          Controlled inputs, inline validation, and async submission — all with
          plain React state and no form library.
        </p>
      </header>

      {status === 'success' ? (
        <SubmittedCard data={submitted} onReset={handleReset} />
      ) : (
        <ContactForm
          fields={fields}
          errors={errors}
          isSubmitting={status === 'submitting'}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default App
