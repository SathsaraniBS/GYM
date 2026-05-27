// server/routes/contact.js
import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── In-memory store (replace with MongoDB model later) ──
let messages = [];

// ── POST /api/contact — public, no auth ──
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    const newMsg = {
      _id:       Date.now().toString(),
      name,
      email,
      mobile:    mobile || '—',
      message,
      status:    'unread',
      createdAt: new Date().toISOString(),
    };

    messages.unshift(newMsg);

    res.status(201).json({
      message: 'Message sent successfully! We\'ll get back to you soon.',
      contact: newMsg,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// ── GET /api/contact — admin only ──
router.get('/', protect, adminOnly, (req, res) => {
  res.json({ messages, total: messages.length });
});

// ── PUT /api/contact/:id — mark read/replied ──
router.put('/:id', protect, adminOnly, (req, res) => {
  const idx = messages.findIndex(m => m._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Message not found' });
  messages[idx] = { ...messages[idx], ...req.body };
  res.json({ message: messages[idx] });
});

// ── DELETE /api/contact/:id — admin only ──
router.delete('/:id', protect, adminOnly, (req, res) => {
  const idx = messages.findIndex(m => m._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Message not found' });
  messages.splice(idx, 1);
  res.json({ message: 'Message deleted' });
});

export default router;