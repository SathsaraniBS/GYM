import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';


const app = express();
const router = express.Router();

config({ path: './config.env' });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});