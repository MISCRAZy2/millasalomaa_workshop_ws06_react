# 05 – Routing

A focused demo of **React Router v6** — client-side navigation in a single-page application without full page reloads.

## What this covers

| # | Concept | Where |
|---|---------|-------|
| 1 | `<BrowserRouter>` — provides routing context to the whole app | `main.jsx` |
| 2 | `<Routes>` + `<Route>` — map URL paths to components | `App.jsx` |
| 3 | `<NavLink>` — link with automatic active styling | `NavBar.jsx` |
| 4 | `<Link>` — navigate without a page reload | `PostsPage.jsx`, `HomePage.jsx` |
| 5 | `useParams()` — read dynamic URL segments like `:id` | `PostDetailPage.jsx` |
| 6 | `useNavigate()` — programmatic navigation (back button) | `PostDetailPage.jsx` |
| 7 | `useLocation()` — read the current URL path | `NotFoundPage.jsx` |
| 8 | Catch-all route `path="*"` — renders the 404 page for unknown URLs | `App.jsx` |

## Route map

```
/              → HomePage         (static landing page)
/posts         → PostsPage        (list of all posts)
/posts/:id     → PostDetailPage   (dynamic segment — id read with useParams)
/about         → AboutPage        (static info page)
*              → NotFoundPage     (catch-all)
```

## Key patterns

### Defining routes
All routes live in one place. `<Routes>` picks the first `<Route>` whose path matches the current URL.

```jsx
<Routes>
  <Route path="/"         element={<HomePage />} />
  <Route path="/posts"    element={<PostsPage />} />
  <Route path="/posts/:id" element={<PostDetailPage />} />
  <Route path="/about"    element={<AboutPage />} />
  <Route path="*"         element={<NotFoundPage />} />
</Routes>
```

### NavLink with active styling
`<NavLink>` accepts a `className` callback that receives `{ isActive }`, making it easy to highlight the current page.

```jsx
<NavLink
  to="/posts"
  className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
>
  Posts
</NavLink>
```

### Reading a dynamic segment
`useParams()` returns an object whose keys match the named segments in the route path.

```jsx
// Route: /posts/:id
const { id } = useParams()   // "3" (always a string)
const post = posts.find(p => p.id === Number(id))
```

### Programmatic navigation
`useNavigate()` returns a function. Pass `-1` to go back one step in history, or a path string to navigate directly.

```jsx
const navigate = useNavigate()
<button onClick={() => navigate(-1)}>← Back</button>
```

## Project structure

```
src/
  main.jsx                  # BrowserRouter wraps the entire app
  App.jsx                   # all Route definitions
  components/
    NavBar.jsx              # sticky nav bar with NavLink
  pages/
    HomePage.jsx            # landing page with concept overview
    PostsPage.jsx           # list of posts, each linking to /posts/:id
    PostDetailPage.jsx      # useParams + useNavigate
    AboutPage.jsx           # static page
    NotFoundPage.jsx        # catch-all 404, uses useLocation
  data/
    posts.js                # static mock data (no fetch needed here)
  App.css                   # component styles
  index.css                 # global reset and CSS variables
```

## Running

```bash
npm install
npm run dev
```

## Try it

| Action | What to observe |
|---|---|
| Click nav links | URL changes, active link is highlighted, no page reload |
| Open `/posts` and click a post | URL becomes `/posts/2`, detail page renders |
| Click ← Back on a post | `navigate(-1)` returns to the previous page |
| Visit `/anything-random` | Catch-all route renders the 404 page with the attempted path |
