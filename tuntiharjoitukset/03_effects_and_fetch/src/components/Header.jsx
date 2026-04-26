function Header() {
  return (
    <header className="header">
      <h1>Effects and Fetch Demo</h1>
      <p>
        Select a user to see their posts. Watch how <code>useEffect</code> loads
        data on mount, reacts to state changes, and cleans up stale requests.
      </p>
    </header>
  )
}

export default Header
