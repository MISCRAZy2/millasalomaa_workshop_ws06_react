# 03 – Effects and Fetch

A focused demo of `useEffect` for data fetching in React.

## What this covers

| # | Concept | Where |
|---|---------|-------|
| 1 | `useEffect` with **empty dependency array `[]`** — runs once on mount | User list fetch in `App.jsx` |
| 2 | `useEffect` with a **dependency** — re-runs when state changes | Post list fetch in `App.jsx` |
| 3 | **Cleanup function** — `AbortController` cancels stale requests | Both fetch effects |
| 4 | **Non-fetch side effect** — updating the document title | Effect 3 in `App.jsx` |
| 5 | **Loading / error / success** state pattern | All data state in `App.jsx` |

## Key points

```jsx
// Run once on mount (empty array)
useEffect(() => { /* fetch */ return () => controller.abort() }, [])

// Re-run when selectedUserId changes
useEffect(() => { /* fetch */ return () => controller.abort() }, [selectedUserId])
```

The cleanup function returned from `useEffect` runs:
- Before the effect runs again (when a dependency changes)
- When the component unmounts

This prevents **race conditions**: if the user clicks a different user before the first
response arrives, the stale request is aborted and its result is silently dropped.

## Running

```bash
npm install
npm run dev
```
