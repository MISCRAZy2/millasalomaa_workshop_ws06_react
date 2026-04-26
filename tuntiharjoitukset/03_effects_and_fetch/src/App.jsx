import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import UserList from './components/UserList.jsx'
import PostList from './components/PostList.jsx'

// ─── Effect 1: run once on mount (empty dependency array []) ──────────────────
// Fetches the list of users from the API when the component first mounts.
// The cleanup function aborts the in-flight request if the component unmounts
// before the response arrives.
//
// ─── Effect 2: run when a dependency changes ([selectedUserId]) ───────────────
// Fetches the posts for the currently selected user whenever selectedUserId
// changes. The cleanup function cancels the previous request so stale data from
// an earlier selection can never overwrite the latest one (race-condition safe).
//
// ─── Effect 3: side effect without fetch ([selectedUserId]) ──────────────────
// Updates the browser tab title whenever the selected user changes.

function App() {
  // ── Users state (loaded once on mount) ───────────────────────────────────
  const [users, setUsers] = useState([])
  const [usersStatus, setUsersStatus] = useState('loading') // 'loading' | 'error' | 'success'
  const [usersError, setUsersError] = useState(null)

  // ── Selected user ─────────────────────────────────────────────────────────
  const [selectedUserId, setSelectedUserId] = useState(null)

  // ── Posts state (loaded whenever selectedUserId changes) ──────────────────
  const [posts, setPosts] = useState([])
  const [postsStatus, setPostsStatus] = useState('idle') // 'idle' | 'loading' | 'error' | 'success'
  const [postsError, setPostsError] = useState(null)

  // ── Effect 1: fetch users once on mount ───────────────────────────────────
  useEffect(() => {
    const controller = new AbortController()

    setUsersStatus('loading')
    setUsersError(null)

    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setUsersStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setUsersError(err.message)
          setUsersStatus('error')
        }
      })

    // Cleanup: cancel the fetch if the component unmounts
    return () => controller.abort()
  }, []) // ← empty array → runs only once, when the component mounts

  // ── Effect 2: fetch posts when the selected user changes ──────────────────
  useEffect(() => {
    if (selectedUserId === null) {
      setPosts([])
      setPostsStatus('idle')
      return
    }

    const controller = new AbortController()

    setPostsStatus('loading')
    setPostsError(null)
    setPosts([])

    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setPosts(data)
        setPostsStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setPostsError(err.message)
          setPostsStatus('error')
        }
      })

    // Cleanup: cancel the previous fetch when selectedUserId changes
    return () => controller.abort()
  }, [selectedUserId]) // ← re-runs every time selectedUserId changes

  // ── Effect 3: update document title (non-fetch side effect) ───────────────
  useEffect(() => {
    const user = users.find((u) => u.id === selectedUserId)
    document.title = user ? `${user.name}'s posts` : '03 – Effects & Fetch'
  }, [selectedUserId, users])

  return (
    <div className="app">
      <Header />

      <div className="layout-grid">
        <section className="section">
          <p className="section-title">Users — fetched once on mount</p>
          <UserList
            users={users}
            status={usersStatus}
            error={usersError}
            selectedId={selectedUserId}
            onSelect={setSelectedUserId}
          />
        </section>

        <section className="section">
          <p className="section-title">
            {selectedUserId === null
              ? 'Posts — select a user'
              : `Posts by user ${selectedUserId} — fetched on selection`}
          </p>
          <PostList
            posts={posts}
            status={postsStatus}
            error={postsError}
          />
        </section>
      </div>
    </div>
  )
}

export default App
