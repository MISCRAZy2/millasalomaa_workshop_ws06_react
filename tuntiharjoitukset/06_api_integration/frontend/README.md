# 06 – API Integration: Frontend

A React single-page application that performs full CRUD against the Express backend through a **centralised API module**. Combines routing (React Router), controlled forms, and data fetching in a real app flow.

## Running

Make sure the backend is running on port 3001 first, then:

```bash
npm install
npm run dev      # Vite dev server on http://localhost:5177
```

## How the Vite proxy works

```js
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:3001',
  },
},
```

Any `fetch('/api/...')` call from React is forwarded by Vite to the backend at `localhost:3001`. The browser only ever talks to `localhost:5177`, so there are no CORS issues during development.

## API base URL in production

Frontend API calls are built from `VITE_API_BASE_URL`:

- Empty value: calls use relative paths like `/api/notes`
- Set value: calls use `https://your-backend.onrender.com/api/notes`

This lets the same code work in both local Compose and Render.

## Docker

Build and run frontend container directly:

```bash
docker build -t ws06-api-frontend .
docker run --rm -p 8080:80 ws06-api-frontend
```

Or run both services from parent folder:

```bash
cd ..
docker compose up --build
```

Then open `http://localhost:8080`.

## Render

For Render Docker deploys:

1. Deploy backend first and copy its public URL.
2. Set frontend env var:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

3. Redeploy frontend (Vite embeds this value at build time).

## API module

All HTTP calls live in **`src/api/notes.js`** — components never call `fetch()` directly.

```js
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes.js'
```

Benefits:
- One place to change the base URL, add auth headers, or swap the transport layer
- Components stay focused on UI logic
- Easy to mock in tests

## Route map

| URL | Component | API call |
|-----|-----------|----------|
| `/notes` | `NotesPage` | `GET /api/notes` |
| `/notes/new` | `NewNotePage` | `POST /api/notes` |
| `/notes/:id` | `NoteDetailPage` | `GET /api/notes/:id` + `DELETE` |
| `/notes/:id/edit` | `EditNotePage` | `GET /api/notes/:id` + `PUT` |
| `*` | `NotFoundPage` | — |

## Project structure

```
frontend/
├── package.json
├── vite.config.js          # Vite proxy: /api → localhost:3001
├── index.html
└── src/
    ├── main.jsx             # BrowserRouter wraps the app
    ├── App.jsx              # all Route definitions
    ├── api/
    │   └── notes.js         # getNotes, getNote, createNote, updateNote, deleteNote
    ├── components/
    │   ├── NavBar.jsx        # sticky nav with NavLink active state
    │   └── NoteForm.jsx      # shared controlled form (create + edit)
    ├── pages/
    │   ├── NotesPage.jsx     # list
    │   ├── NoteDetailPage.jsx
    │   ├── NewNotePage.jsx
    │   ├── EditNotePage.jsx
    │   └── NotFoundPage.jsx
    ├── App.css
    └── index.css
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI library |
| `react-router-dom` | Client-side routing |
| `vite`, `@vitejs/plugin-react` | Dev server and build tool |
