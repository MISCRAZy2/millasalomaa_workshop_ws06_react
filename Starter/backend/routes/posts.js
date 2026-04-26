const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    return res.status(201).json(saved);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  // 1) Keep ObjectId validation (already done for you)
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    // 2 & 3) Find the post and update it with the new info (req.body)
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // 'new' gives us back the updated version, 'runValidators' checks our schema rules
    );

    // 4) If the database returns nothing, the post didn't exist
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Success! Send back the updated post
    return res.json(updatedPost);

  } catch (error) {
    // 5) If the user tried to save something bad (like a title that is too short), it throws a ValidationError
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    // Any other weird server issue
    return res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // 1) Keep ObjectId validation
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    // 2) Tell the database to find this ID and trash it
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    // 3) If it wasn't there to begin with, tell the user
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 4) Success! Send a nice message.
    return res.json({ message: 'Post successfully deleted!' });

  } catch (error) {
    // 5) Server error fallback
    return res.status(500).json({ error: 'Server error' });
  }
});

return res.status(501).json({ message: 'TODO: implement DELETE /api/posts/:id' });

module.exports = router;