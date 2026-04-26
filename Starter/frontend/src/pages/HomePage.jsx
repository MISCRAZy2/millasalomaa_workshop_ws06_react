import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

function HomePage() {
  // Our empty boxes to hold data, loading status, and errors
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // STEP 1 & 2: As soon as the page loads, fetch the posts
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        // If the kitchen says something is wrong, throw an error
        if (!res.ok) throw new Error('Failed to fetch posts from the server')
        // Otherwise, unpack the JSON data
        return res.json()
      })
      .then((data) => {
        setPosts(data) // Put the fetched posts into our empty array box
        setLoading(false) // Turn off the loading message
      })
      .catch((err) => {
        setError(err.message) // If the connection fails entirely, show the error
        setLoading(false)
      })
  }, []) // The empty [] means "only do this once when the page first opens"

  // STEP 3: Show loading and error messages if needed
  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  // STEP 4: Render the actual page
  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">
          Welcome to our awesome blog. Check out the latest updates below!
        </p>
      </div>

      {/* If we have 0 posts, show a friendly message. Otherwise, map through them. */}
      {posts.length === 0 ? (
        <p className="status-msg">No posts yet. You should go write the first one!</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              {/* Pass the data for one single post into the PostCard component */}
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage