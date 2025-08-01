import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';


const app = express();
const router = express.Router();

config({ path: './config.env' });

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: 'POST',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/api/mail",async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    );
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: `Message from ${name}`,
      text: message,
    };
  }
  catch (err) {
    console.log(err);
  }
});

app.use(
  "/api",
  router
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});