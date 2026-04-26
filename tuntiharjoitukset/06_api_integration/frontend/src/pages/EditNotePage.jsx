import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm.jsx'
import { getNote, updateNote } from '../api/notes.js'

// ── GET /api/notes/:id  +  PUT /api/notes/:id ─────────────────────────────────
// First fetches the existing note so the form is pre-filled.
// On submit, sends a PUT with the updated fields and navigates to the detail page.

function EditNotePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)
  const [loadStatus, setLoadStatus] = useState('loading')
  const [loadError, setLoadError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Load existing note to pre-fill the form
  useEffect(() => {
    getNote(id)
      .then((data) => {
        setNote(data)
        setLoadStatus('success')
      })
      .catch((err) => {
        setLoadError(err.message)
        setLoadStatus('error')
      })
  }, [id])

  async function handleSubmit(payload) {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await updateNote(id, payload)
      navigate(`/notes/${id}`)
    } catch (err) {
      setSubmitError(err.message)
      setIsSubmitting(false)
    }
  }

  if (loadStatus === 'loading') return <p className="status-msg">Loading…</p>
  if (loadStatus === 'error')   return <p className="status-msg status-error">Error: {loadError}</p>

  return (
    <div className="page">
      <h1>Edit note</h1>
      {submitError && <p className="status-msg status-error">{submitError}</p>}
      <NoteForm
        initialValues={{ title: note.title, body: note.body }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Save changes"
      />
    </div>
  )
}

export default EditNotePage
