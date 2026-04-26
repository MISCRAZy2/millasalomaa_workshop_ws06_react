import { Link, useLocation } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()
  return (
    <div className="page">
      <div className="not-found-box">
        <p className="not-found-code">404</p>
        <h1>Page not found</h1>
        <p>No route matches <code>{location.pathname}</code>.</p>
        <Link to="/notes" className="btn-primary">Go to notes</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
