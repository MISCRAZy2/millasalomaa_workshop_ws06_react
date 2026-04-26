function AboutPage() {
  return (
    <div className="page">
      <h1>About</h1>
      <p className="lead">
        This is a static page — it has no URL parameters and does not fetch any
        data. It is here to show that a plain <code>&lt;Route&gt;</code> renders
        any React component.
      </p>
      <div className="info-card">
        <h2>How client-side routing works</h2>
        <p>
          When you click a <code>&lt;Link&gt;</code> or <code>&lt;NavLink&gt;</code>,
          React Router intercepts the click, updates the browser URL using the{' '}
          <strong>History API</strong>, and re-renders the matching{' '}
          <code>&lt;Route&gt;</code> — all without a network round-trip.
        </p>
        <p>
          The server only ever serves the single <code>index.html</code> file.
          The browser handles all subsequent "page changes" in JavaScript.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
