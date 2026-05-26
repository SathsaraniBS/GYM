// server/index.js
import express   from 'express';
import cors      from 'cors';
import mongoose  from 'mongoose';
import dotenv    from 'dotenv';

import authRouter    from './routes/auth.js';
import reviewRouter  from './routes/reviews.js';
import adminRouter   from './routes/admin.js';
import contactRouter from './routes/contact.js';
import mediaRouter   from './routes/media.js';   // ✅ ADD — Media Manager

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ── Routes ──
app.use('/api/auth',         authRouter);
app.use('/api/reviews',      reviewRouter);
app.use('/api/admin',        adminRouter);
app.use('/api/contact',      contactRouter);
app.use('/api/admin/media',  mediaRouter);        // ✅ ADD — Media Manager

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// ── MongoDB connection ──
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));