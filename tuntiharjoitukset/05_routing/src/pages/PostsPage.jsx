import { Link } from 'react-router-dom'
import { posts } from '../data/posts.js'

// PostsPage renders a list of post cards.
// Each card links to /posts/:id using <Link to={`/posts/${post.id}`}>.
// React Router maps that URL to PostDetailPage via the <Route path="/posts/:id"> in App.jsx.

function PostsPage() {
  return (
    <div className="page">
      <h1>Posts</h1>
      <p className="lead">Click a post to read it. The URL will change to <code>/posts/:id</code>.</p>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="post-card">
              <div className="post-card-meta">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
                <span className="post-date">{post.date}</span>
              </div>
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <span className="post-card-author">By {post.author}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsPage
