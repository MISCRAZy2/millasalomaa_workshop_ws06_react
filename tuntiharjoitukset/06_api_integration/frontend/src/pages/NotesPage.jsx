import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNotes } from '../api/notes.js'

// ── GET /api/notes ────────────────────────────────────────────────────────────
// Calls the centralised API module on mount.
// Shows loading → error → success states.

function NotesPage() {
  const [notes, setNotes] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    getNotes()
      .then((data) => {
        setNotes(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [])

  if (status === 'loading') return <p className="status-msg">Loading notes…</p>
  if (status === 'error')   return <p className="status-msg status-error">Error: {error}</p>

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notes</h1>
        <Link to="/notes/new" className="btn-primary">+ New note</Link>
      </div>

      {notes.length === 0 ? (
        <p className="status-msg">No notes yet. Create one!</p>
      ) : (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`} className="note-card">
                <h2 className="note-card-title">{note.title}</h2>
                <p className="note-card-body">{note.body}</p>
                <span className="note-card-date">
                  {new Date(note.createdAt).toLocaleDateString('en-FI')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotesPage
