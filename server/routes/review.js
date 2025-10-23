import express from 'express'
import Review from '../models/review.js';
import middleware from '../middleware/middleware.js'

const router = express.Router()

router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    // FIX: Validate input to prevent database errors
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }
    const newReview = new Note({
      title,
      description,
      userId: req.user.id
    })
    await newReview.save()
    return res.status(200).json({ success: true, message: "Note created successfully" })
  } catch (error) {
    // FIX: Detailed error logging
    console.error('Error adding note:', error.message);
    return res.status(500).json({ success: false, message: "Error adding note: " + error.message })
  }
})

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Review.find({ userId: req.user.id })
    return res.status(200).json({ success: true, notes })
  } catch (error) {
    // FIX: Detailed error logging
    console.error('Error retrieving notes:', error.message);
    return res.status(500).json({ success: false, message: "Error retrieving notes: " + error.message })
  }
})

router.put("/:id", middleware, async (req, res) => { // FIX: Added middleware
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // FIX: Validate input
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    )
    // FIX: Check if note exists
    if (!updatedReview) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    return res.status(200).json({ success: true, updatedNote })
  } catch (error) {
    // FIX: Detailed error logging
    console.error('Error updating note:', error.message);
    return res.status(500).json({ success: false, message: "Error updating note: " + error.message })
  }
})

router.delete("/:id", middleware, async (req, res) => { // FIX: Added middleware
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id)
    // FIX: Check if note exists
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    return res.status(200).json({ success: true, deletedNote })
  } catch (error) {
    // FIX: Detailed error logging
    console.error('Error deleting note:', error.message);
    return res.status(500).json({ success: false, message: "Error deleting note: " + error.message })
  }
})

export default router