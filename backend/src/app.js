import dotenv from 'dotenv'
import express from "express"
import { authRouter } from './routes/auth.routes.js';
import { validateRouter } from './routes/validate.routes.js';
import { historyRouter } from './routes/history.routes.js';
import cors from "cors";
dotenv.config();

const app=express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!')
})

//auth routes
app.use('/api/auth',authRouter);
//validate company routes
app.use('/api/validate',validateRouter);

//history routes
app.use('/api/history',historyRouter);

export default app;