# 06 – API Integration: Backend

A minimal Express REST API for the notes app. Uses an **in-memory array** as the data store — no database setup required. Data resets on every server restart; the focus is on the API contract and route structure, not persistence.

## Running

```bash
npm install
npm run dev      # node --watch server.js (auto-restarts on file changes)
# or
npm start        # node server.js (no auto-restart)
```

Server starts on **http://localhost:3001**.

## Docker

Build and run backend container directly:

```bash
docker build -t ws06-api-backend .
docker run --rm -p 3001:3001 \
  -e PORT=3001 \
  -e FRONTEND_ORIGIN=http://localhost:8080 \
  ws06-api-backend
```

Or run both backend and frontend with Compose from the parent folder:

```bash
cd ..
docker compose up --build
```

## Render

This backend is configured for Render Docker deploys:
- `PORT` is read from environment (`process.env.PORT`)
- `FRONTEND_ORIGIN` can be a comma-separated allowlist

Example:

```env
FRONTEND_ORIGIN=http://localhost:5177,https://your-frontend.onrender.com
```

## REST API

| Method | Path | Body | Status | Description |
|--------|------|------|--------|-------------|
| GET | `/api/notes` | — | 200 | Return all notes, newest first |
| GET | `/api/notes/:id` | — | 200 / 404 | Return a single note |
| POST | `/api/notes` | `{ title, body }` | 201 / 400 | Create a note |
| PUT | `/api/notes/:id` | `{ title?, body? }` | 200 / 400 / 404 | Update a note |
| DELETE | `/api/notes/:id` | — | 204 / 404 | Delete a note |

### Example requests

```bash
# List all notes
curl http://localhost:3001/api/notes

# Get one note
curl http://localhost:3001/api/notes/1

# Create a note
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My note","body":"Hello from curl"}'

# Update a note
curl -X PUT http://localhost:3001/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title"}'

# Delete a note
curl -X DELETE http://localhost:3001/api/notes/1
```

## Note shape

```json
{
  "id": 1,
  "title": "What is API integration?",
  "body": "API integration means connecting two systems...",
  "createdAt": "2026-04-10T09:00:00.000Z"
}
```

## Project structure

```
backend/
├── package.json    # dependencies: express, cors
└── server.js       # all routes and in-memory data in one file
```

## CORS

CORS is configured from `FRONTEND_ORIGIN`.

- Default: `http://localhost:5177`
- Supports multiple origins separated by commas
- Requests without an Origin header (for example curl) are allowed

In development, the Vite proxy can avoid browser CORS entirely, but CORS is still useful for production deployments where frontend and backend have different domains.
