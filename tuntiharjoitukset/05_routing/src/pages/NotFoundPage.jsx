import { Link, useLocation } from 'react-router-dom'

// NotFoundPage is rendered by the catch-all <Route path="*"> in App.jsx.
// useLocation() lets us read the URL that triggered this page — useful for
// showing the user what path they tried to visit.

function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="page">
      <div className="not-found-box">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p>
          No route matches{' '}
          <code>{location.pathname}</code>.
        </p>
        <Link to="/" className="btn-primary">Go home</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
