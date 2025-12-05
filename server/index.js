import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import reviewRouter from './routes/reviews.js';
import adminRouter from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/auth',authRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(5000,()=>{
//     console.log("server is running ");
// })