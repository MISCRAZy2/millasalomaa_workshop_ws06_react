import { useParams, useNavigate, Link } from 'react-router-dom'
import { posts } from '../data/posts.js'

// ─── useParams ────────────────────────────────────────────────────────────────
// Reads the dynamic :id segment from the current URL.
// If the URL is /posts/2, then params.id === "2" (always a string).
//
// ─── useNavigate ─────────────────────────────────────────────────────────────
// Returns a function for programmatic navigation.
// navigate(-1) goes back one step in the browser history — like the back button.
// navigate('/posts') navigates to an absolute path.

function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // id from the URL is a string; post ids are numbers — convert before comparing
  const post = posts.find((p) => p.id === Number(id))

  // Show a friendly 404 if the id doesn't match any post
  if (!post) {
    return (
      <div className="page">
        <div className="not-found-box">
          <p className="not-found-code">404</p>
          <h1>Post not found</h1>
          <p>There is no post with id <code>{id}</code>.</p>
          <Link to="/posts" className="btn-primary">Back to posts</Link>
        </div>
      </div>
    )
  }

  return (
    <article className="page post-detail">
      <button
        className="btn-back"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="post-detail-meta">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
        <span className="post-date">{post.date}</span>
      </div>

      <h1>{post.title}</h1>
      <p className="post-detail-author">By {post.author}</p>

      <div className="post-body">
        {post.body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="post-detail-footer">
        <Link to="/posts" className="btn-secondary">All posts</Link>
      </div>
    </article>
  )
}

export default PostDetailPage
