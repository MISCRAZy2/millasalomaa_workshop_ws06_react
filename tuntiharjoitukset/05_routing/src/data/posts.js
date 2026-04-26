// Static mock data — no fetch needed here (that was covered in 03_effects_and_fetch).
// In a real app this data would come from an API.

export const posts = [
  {
    id: 1,
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    author: 'Ada Lovelace',
    date: '2026-03-10',
    tags: ['React', 'Beginner'],
    excerpt:
      'React is a JavaScript library for building user interfaces. In this post we cover the very basics: JSX, components, and rendering.',
    body: `React lets you build UIs out of individual pieces called components. You can combine them into entire screens, pages, and apps.

A component is a JavaScript function that returns JSX — a syntax that looks like HTML but compiles to regular JavaScript.

\`\`\`jsx
function Hello({ name }) {
  return <p>Hello, {name}!</p>
}
\`\`\`

Components accept inputs called **props** and manage their own internal **state** with hooks like \`useState\`. Once you understand these two ideas, the rest of React follows naturally.`,
  },
  {
    id: 2,
    slug: 'understanding-use-effect',
    title: 'Understanding useEffect',
    author: 'Alan Turing',
    date: '2026-03-18',
    tags: ['React', 'Hooks'],
    excerpt:
      'useEffect lets you synchronise a component with an external system — a REST API, a timer, or browser APIs like localStorage.',
    body: `The **dependency array** is the most important thing to understand about \`useEffect\`.

- **No array** → effect runs after every render.
- **Empty array \`[]\`** → effect runs once, after the first render (on mount).
- **Array with values** → effect re-runs whenever those values change.

Always return a **cleanup function** when the effect sets up a subscription or starts an async operation. The cleanup runs before the next effect and when the component unmounts.

\`\`\`jsx
useEffect(() => {
  const controller = new AbortController()
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
  return () => controller.abort()
}, [])
\`\`\``,
  },
  {
    id: 3,
    slug: 'forms-in-react',
    title: 'Forms in React',
    author: 'Grace Hopper',
    date: '2026-03-25',
    tags: ['React', 'Forms'],
    excerpt:
      'Learn the controlled-input pattern: keep form values in React state and let React be the single source of truth.',
    body: `An **uncontrolled input** stores its own value in the DOM. A **controlled input** stores its value in React state via the \`value\` prop.

Controlled inputs are easier to validate, reset, and derive computed values from, which is why they are the recommended pattern in React apps.

A single \`onChange\` handler can update any field using the computed property name trick:

\`\`\`jsx
function handleChange(e) {
  const { name, value } = e.target
  setFields(prev => ({ ...prev, [name]: value }))
}
\`\`\`

Always call \`e.preventDefault()\` inside \`onSubmit\` to stop the browser from reloading the page.`,
  },
  {
    id: 4,
    slug: 'client-side-routing',
    title: 'Client-Side Routing with React Router',
    author: 'Ada Lovelace',
    date: '2026-04-01',
    tags: ['React', 'Routing'],
    excerpt:
      'React Router maps URL paths to React components without a full page reload, giving SPAs the feel of a multi-page site.',
    body: `In a traditional website every link triggers a full HTTP request and the browser renders a new page. In a **Single-Page Application (SPA)** the browser loads one HTML file and JavaScript swaps out the content.

React Router intercepts clicks on \`<Link>\` and \`<NavLink>\` elements, updates the URL with the History API, and re-renders the matching \`<Route>\`.

Key building blocks:

| Component / Hook | Purpose |
|---|---|
| \`<BrowserRouter>\` | Provides routing context to the whole app |
| \`<Routes>\` | Picks the first \`<Route>\` whose path matches |
| \`<Route>\` | Maps a path to a component |
| \`<Link>\` | Navigate without a page reload |
| \`<NavLink>\` | Like Link, but adds an active class when the URL matches |
| \`useParams()\` | Read dynamic segments like \`:id\` from the URL |
| \`useNavigate()\` | Programmatic navigation (e.g. after a form submit) |`,
  },
]
