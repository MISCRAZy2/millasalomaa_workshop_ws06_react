// NoteForm — shared controlled form for both create and edit.
//
// Props:
//   initialValues  – { title, body } pre-filled for edit, empty for create
//   onSubmit       – called with { title, body } when the form is submitted
//   isSubmitting   – disables the form while the request is in flight
//   submitLabel    – button text ("Create note" or "Save changes")

import { useState } from 'react'

function NoteForm({ initialValues = { title: '', body: '' }, onSubmit, isSubmitting, submitLabel = 'Submit' }) {
  const [fields, setFields] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!fields.title.trim()) errs.title = 'Title is required.'
    if (!fields.body.trim()) errs.body = 'Body is required.'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({ title: fields.title.trim(), body: fields.body.trim() })
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <div className={`field-group${errors.title ? ' field-group--error' : ''}`}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Note title"
          value={fields.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className={`field-group${errors.body ? ' field-group--error' : ''}`}>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          rows={7}
          placeholder="Write your note here…"
          value={fields.body}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.body && <span className="field-error">{errors.body}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

export default NoteForm
