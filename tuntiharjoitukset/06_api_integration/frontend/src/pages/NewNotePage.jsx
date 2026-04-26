import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import { createNote } from '../api/notes.js'

// ── POST /api/notes ───────────────────────────────────────────────────────────
// Receives the validated { title, body } from NoteForm's onSubmit,
// calls the API module, and navigates to the new note's detail page on success.

function NewNotePage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(payload) {
    setIsSubmitting(true)
    setError(null)
    try {
      const created = await createNote(payload)
      navigate(`/notes/${created.id}`)
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page">
      <h1>New note</h1>
      {error && <p className="status-msg status-error">{error}</p>}
      <NoteForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create note"
      />
    </div>
  )
}

export default NewNotePage
