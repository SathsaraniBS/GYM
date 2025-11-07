import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// POST - Create new review
router.post('/', async (req, res) => {
  try {
    const { name, stars, text } = req.body;
    const review = new Review({ name, stars, text });
    await review.save();
    res.status(201).json({ message: 'Review saved', review });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - All reviews (latest first)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;