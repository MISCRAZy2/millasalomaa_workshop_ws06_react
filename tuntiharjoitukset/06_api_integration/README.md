# 06 – API Integration

A fullstack notes app that brings together everything from the previous exercises — routing, forms, and data fetching — and adds the missing piece: a **dedicated API module** and a real **Express backend**.

## What this covers

| # | Concept | Where |
|---|---------|-------|
| 1 | **API module** — centralised fetch calls, one file to change | `frontend/src/api/notes.js` |
| 2 | **Vite proxy** — forward `/api/*` to backend, no CORS in dev | `frontend/vite.config.js` |
| 3 | **Full CRUD** — GET list, GET single, POST, PUT, DELETE | All pages + `api/notes.js` |
| 4 | **In-memory backend** — Express with an array (no database needed) | `backend/server.js` |
| 5 | **Shared form component** — reused for create and edit | `NoteForm.jsx` |
| 6 | **Loading / error / success states** for every operation | Each page component |
| 7 | Combined routing + forms + effects in a real app flow | End-to-end |

## Architecture

```
browser  ←→  Vite dev server :5177  ←→  Express backend :3001
                  (proxy /api/*)
```

In development the Vite proxy makes `fetch('/api/notes')` reach the backend at `localhost:3001` transparently — no CORS configuration needed in the browser.

## Deploying with Docker Compose (local)

From the `06_api_integration` folder:

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3001/api/notes`

Compose uses:
- `frontend/nginx.conf` to proxy `/api/*` to the backend container
- `docker-compose.yml` to start `frontend` and `backend` together

To stop:

```bash
docker compose down
```

## Deploying to Render

Render does not run `docker-compose.yml` directly.
Use the included `render.yaml` Blueprint instead.

1. Push this repository to GitHub.
2. In Render, create a new Blueprint and point it to the repo.
3. Render reads `tuntiharjoitukset/06_api_integration/render.yaml` and creates:
  - `ws06-api-backend` (Docker web service)
  - `ws06-api-frontend` (Docker web service)
4. After first deploy, set environment variables in Render:
  - On backend: `FRONTEND_ORIGIN=https://<your-frontend>.onrender.com`
  - On frontend: `VITE_API_BASE_URL=https://<your-backend>.onrender.com`
5. Trigger a redeploy of frontend after setting `VITE_API_BASE_URL`.

Important:
- `VITE_API_BASE_URL` is a build-time variable for Vite.
- If it is empty, frontend uses relative `/api/...` URLs (good for local proxy/compose).
- On Render (separate domains), set it to the backend public URL.

## Project structure

```
06_api_integration/
├── backend/
│   ├── package.json
│   └── server.js          # Express + in-memory CRUD routes
└── frontend/
    ├── package.json
    ├── vite.config.js      # proxy: /api → localhost:3001
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx          # route definitions
        ├── api/
        │   └── notes.js     # ← all fetch() calls live here
        ├── components/
        │   ├── NavBar.jsx
        │   └── NoteForm.jsx  # shared form for create + edit
        ├── pages/
        │   ├── NotesPage.jsx      # GET  /api/notes
        │   ├── NoteDetailPage.jsx # GET  /api/notes/:id  +  DELETE
        │   ├── NewNotePage.jsx    # POST /api/notes
        │   ├── EditNotePage.jsx   # GET  /api/notes/:id  +  PUT
        │   └── NotFoundPage.jsx
        ├── App.css
        └── index.css
```

## Key pattern — the API module

Instead of writing `fetch()` inline in every component, all HTTP calls live in one file:

```js
// src/api/notes.js
const BASE = '/api/notes'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (res.status === 204) return null
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`)
  return data
}

export const getNotes   = ()           => request(BASE)
export const getNote    = (id)         => request(`${BASE}/${id}`)
export const createNote = (payload)    => request(BASE, { method: 'POST', body: JSON.stringify(payload) })
export const updateNote = (id, payload)=> request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
export const deleteNote = (id)         => request(`${BASE}/${id}`, { method: 'DELETE' })
```

Components then call `getNotes()` instead of writing `fetch('/api/notes')` everywhere.

## Key pattern — Vite proxy

```js
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:3001',
  },
},
```

Any request to `/api/*` from your React code is forwarded to the backend. You deploy this proxy config only in development; in production the frontend and backend are served from the same origin.

## REST API reference

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notes` | Return all notes (newest first) |
| GET | `/api/notes/:id` | Return a single note |
| POST | `/api/notes` | Create a note — body: `{ title, body }` |
| PUT | `/api/notes/:id` | Update a note — body: `{ title?, body? }` |
| DELETE | `/api/notes/:id` | Delete a note (returns 204) |

## Running

Open two terminals:

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev      # node --watch server.js on port 3001

# Terminal 2 — frontend
cd frontend
npm install
npm run dev      # Vite dev server on port 5177
```

Then open **http://localhost:5177**.

> **Note:** data is stored in memory — it resets every time the backend restarts. This is intentional; the focus here is the frontend integration pattern, not persistence.
