const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

// Comma-separated list of allowed origins, for example:
// FRONTEND_ORIGIN=http://localhost:5177,https://my-frontend.onrender.com
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || 'http://localhost:5177')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json())

// Allow browser requests from known frontend origins.
// Requests without an Origin header (curl, server-to-server) are allowed.
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
      return
    }
    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
}))

// ── In-memory data store ──────────────────────────────────────────────────────
// A simple array replaces a real database for this exercise.
// Data resets whenever the server restarts – that is intentional.
let nextId = 4
const notes = [
  {
    id: 1,
    title: 'What is API integration?',
    body: 'API integration means connecting two systems so they can share data. In this exercise the React frontend fetches data from an Express backend through a REST API.',
    createdAt: '2026-04-10T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'The Vite proxy trick',
    body: 'Vite can forward requests that start with /api to your backend server. This means your frontend can call fetch("/api/notes") without any CORS issues during development.',
    createdAt: '2026-04-11T10:30:00.000Z',
  },
  {
    id: 3,
    title: 'Centralise your fetch calls',
    body: 'Instead of writing fetch() inline in every component, put all API calls in one file (e.g. src/api/notes.js). Components then call getNotes(), createNote(), etc. which makes the code easier to test and change.',
    createdAt: '2026-04-12T14:15:00.000Z',
  },
]

// ── Helper ────────────────────────────────────────────────────────────────────
function findNote(id) {
  return notes.find((n) => n.id === Number(id))
}

// ── Routes ────────────────────────────────────────────────────────────────────

// GET /api/notes → return all notes (newest first)
app.get('/api/notes', (req, res) => {
  const sorted = [...notes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
  res.json(sorted)
})

// GET /api/notes/:id → return one note
app.get('/api/notes/:id', (req, res) => {
  const note = findNote(req.params.id)
  if (!note) return res.status(404).json({ error: 'Note not found' })
  res.json(note)
})

// POST /api/notes → create a new note
app.post('/api/notes', (req, res) => {
  const { title, body } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }
  if (!body || !body.trim()) {
    return res.status(400).json({ error: 'body is required' })
  }

  const note = {
    id: nextId++,
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
  }
  notes.push(note)
  res.status(201).json(note)
})

// PUT /api/notes/:id → update a note
app.put('/api/notes/:id', (req, res) => {
  const note = findNote(req.params.id)
  if (!note) return res.status(404).json({ error: 'Note not found' })

  const { title, body } = req.body

  if (title !== undefined) {
    if (!title.trim()) return res.status(400).json({ error: 'title cannot be empty' })
    note.title = title.trim()
  }
  if (body !== undefined) {
    if (!body.trim()) return res.status(400).json({ error: 'body cannot be empty' })
    note.body = body.trim()
  }

  res.json(note)
})

// DELETE /api/notes/:id → remove a note
app.delete('/api/notes/:id', (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Note not found' })

  notes.splice(index, 1)
  res.status(204).end()
})

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
  console.log('Routes:')
  console.log('  GET    /api/notes')
  console.log('  GET    /api/notes/:id')
  console.log('  POST   /api/notes')
  console.log('  PUT    /api/notes/:id')
  console.log('  DELETE /api/notes/:id')
})
