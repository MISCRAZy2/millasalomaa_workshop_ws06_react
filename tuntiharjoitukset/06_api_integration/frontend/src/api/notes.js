// ── API module ────────────────────────────────────────────────────────────────
// All HTTP calls to the backend live here. Components import these functions
// instead of calling fetch() directly. Benefits:
//   • One place to change base URL, headers, or auth tokens
//   • Easy to mock in tests
//   • Components stay focused on UI logic, not fetch plumbing
//
// Every function throws an Error on non-2xx responses so callers can catch it
// and display an error message without checking res.ok themselves.

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const BASE = `${API_BASE_URL}/api/notes`

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (res.status === 204) return null  // DELETE returns no body
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`)
  return data
}

// GET /api/notes
export function getNotes() {
  return request(BASE)
}

// GET /api/notes/:id
export function getNote(id) {
  return request(`${BASE}/${id}`)
}

// POST /api/notes   body: { title, body }
export function createNote(payload) {
  return request(BASE, { method: 'POST', body: JSON.stringify(payload) })
}

// PUT /api/notes/:id   body: { title, body }
export function updateNote(id, payload) {
  return request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

// DELETE /api/notes/:id
export function deleteNote(id) {
  return request(`${BASE}/${id}`, { method: 'DELETE' })
}
