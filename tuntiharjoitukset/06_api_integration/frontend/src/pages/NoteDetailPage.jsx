import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getNote, deleteNote } from '../api/notes.js'

// ── GET /api/notes/:id  +  DELETE /api/notes/:id ──────────────────────────────
// useParams reads the :id segment from the URL.
// The delete handler calls deleteNote() then navigates back to the list.

function NoteDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setStatus('loading')
    getNote(id)
      .then((data) => {
        setNote(data)
        setStatus('success')
      })
      .catch((err) => {
        setError(err.message)
        setStatus('error')
      })
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Delete this note? This cannot be undone.')) return
    setDeleting(true)
    try {
      await deleteNote(id)
      navigate('/notes')
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (status === 'loading') return <p className="status-msg">Loading…</p>
  if (status === 'error')   return <p className="status-msg status-error">Error: {error}</p>

  return (
    <article className="page note-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>

      <h1>{note.title}</h1>
      <p className="note-detail-date">
        {new Date(note.createdAt).toLocaleString('en-FI')}
      </p>

      <div className="note-detail-body">
        {note.body.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>

      <div className="note-detail-actions">
        <Link to={`/notes/${note.id}/edit`} className="btn-secondary">Edit</Link>
        <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </article>
  )
}

export default NoteDetailPage
