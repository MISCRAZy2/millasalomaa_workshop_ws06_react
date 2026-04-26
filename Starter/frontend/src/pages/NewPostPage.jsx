import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

function NewPostPage() {
  const navigate = useNavigate() // Our steering wheel to redirect the user
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault() // Stop the page from doing a hard refresh
    setSubmitting(true) // Disable the save button so they don't click it twice
    setError(null) // Clear out any old errors

    // 1) Read the values the user typed into the form
    const formData = new FormData(e.target)
    const newPost = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: formData.get('content')
    }

    try {
      // 2) Send a POST request to the backend with the new post data
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })

      const data = await res.json()

      // If the backend sends back an error (like a validation error), throw it
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create post')
      }

      // 3) On success, navigate to the specific page for this new post
      navigate(`/posts/${data._id}`)
      
    } catch (err) {
      // 4) Show an error message on failure
      setError(err.message)
      setSubmitting(false) // Turn the submit button back on so they can try again
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage