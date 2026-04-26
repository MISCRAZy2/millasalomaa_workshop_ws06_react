import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

function EditPostPage() {
  const { id } = useParams(); // Gets the ID from the website URL
  const navigate = useNavigate(); // Our steering wheel to redirect the user

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // STEP 1: Fetch the existing post when the page loads
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch the post');
        return res.json();
      })
      .then((data) => {
        setPost(data); // Step 2: Save the old data so the form can use it
        setLoading(false); // Turn off the loading message
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // STEP 3: Save the changes when the user clicks submit
  async function handleSubmit(e) {
    e.preventDefault(); // Stop the page from doing a hard refresh
    setSubmitting(true); // Disable the save button so they don't double-click
    setError(null);

    // Grab the new text out of the form boxes
    const formData = new FormData(e.target);
    const updatedData = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: formData.get('content')
    };

    try {
      // Send the new data to the backend kitchen
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes');
      }

      // STEP 4: Success! Drive them back to the post page
      navigate(`/posts/${id}`);
      
    } catch (err) {
      setError(err.message);
      setSubmitting(false); // Turn the save button back on so they can try again
    }
  }

  // What to show while we wait for the data
  if (loading) return <p className="status-msg">Loading…</p>;
  if (error && !post) return <p className="status-msg error">{error}</p>;
  if (!post) return <p className="status-msg">Post not found.</p>;

  // What to show once we have the data
  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default EditPostPage