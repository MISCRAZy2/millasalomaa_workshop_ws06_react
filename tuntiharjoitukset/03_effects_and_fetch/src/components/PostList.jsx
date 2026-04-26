function PostList({ posts, status, error }) {
  if (status === 'idle') {
    return <p className="status-message">← Pick a user to load their posts.</p>
  }

  if (status === 'loading') {
    return <p className="status-message">Loading posts…</p>
  }

  if (status === 'error') {
    return <p className="status-message status-error">Error: {error}</p>
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="card post-card">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

export default PostList
