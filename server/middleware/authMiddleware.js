// server/middleware/authMiddleware.js
import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

// ════════════════════════════════════════
// protect — Verify JWT token
// Usage: router.get('/route', protect, handler)
// ════════════════════════════════════════
export const protect = async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized — no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB (exclude password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized — user not found' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized — invalid or expired token' });
  }
};

// ════════════════════════════════════════
// adminOnly — Restrict to admin role
// Usage: router.get('/route', protect, adminOnly, handler)
// ════════════════════════════════════════
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied — admin only' });
  }
  next();
};