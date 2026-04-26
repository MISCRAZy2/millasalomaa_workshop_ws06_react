import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="page">
      <h1>Welcome to the Routing Demo</h1>
      <p className="lead">
        This app demonstrates the core concepts of{' '}
        <strong>React Router v6</strong> — client-side navigation without a full
        page reload.
      </p>

      <div className="concept-grid">
        <div className="concept-card">
          <h3><code>&lt;Routes&gt;</code> and <code>&lt;Route&gt;</code></h3>
          <p>Defined in <code>App.jsx</code>. Each route maps a URL path to a React component.</p>
        </div>
        <div className="concept-card">
          <h3><code>&lt;NavLink&gt;</code></h3>
          <p>Used in the nav bar above. It adds an <code>active</code> class automatically when its path matches the current URL.</p>
        </div>
        <div className="concept-card">
          <h3><code>useParams()</code></h3>
          <p>Used in <Link to="/posts">Posts</Link> → click any post. The <code>:id</code> segment from the URL is read with this hook.</p>
        </div>
        <div className="concept-card">
          <h3><code>useNavigate()</code></h3>
          <p>Used on each post detail page. The "Back" button calls <code>navigate(-1)</code> for programmatic navigation.</p>
        </div>
        <div className="concept-card">
          <h3>Catch-all route <code>*</code></h3>
          <p>
            Try visiting a URL that doesn't exist, like{' '}
            <Link to="/this-does-not-exist">/this-does-not-exist</Link>.
          </p>
        </div>
      </div>

      <Link to="/posts" className="btn-primary">Browse posts →</Link>
    </div>
  )
}

export default HomePage
