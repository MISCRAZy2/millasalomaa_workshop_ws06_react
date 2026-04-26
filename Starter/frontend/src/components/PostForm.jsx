function PostForm({ initialData = {}, onSubmit, submitting }) {
  

  const handleLocalSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading
    
    const formData = new FormData(e.target);
    const packagedData = {
      title: formData.get('title'),
      author: formData.get('author'),
      content: formData.get('content')
    };

    onSubmit(packagedData); 
  };

  return (
    <form className="post-form" onSubmit={handleLocalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
      
      <div className="form-field">
        <label htmlFor="title">Title</label><br />
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialData.title || ''} 
          required
          placeholder="Post title"
          style={{ width: '100%' }}
        />
      </div>

      <div className="form-field">
        <label htmlFor="author">Author</label><br />
        <input
          id="author"
          name="author"
          type="text"
          defaultValue={initialData.author || ''}
          required
          placeholder="Your name"
          style={{ width: '100%' }}
        />
      </div>

      <div className="form-field">
        <label htmlFor="content">Content</label><br />
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={initialData.content || ''}
          required
          placeholder="Write your post here…"
          style={{ width: '100%' }}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save post'}
      </button>

    </form>
  );
}

export default PostForm;