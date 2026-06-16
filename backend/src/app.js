import dotenv from 'dotenv'
import express from "express"
import { authRouter } from './routes/auth.routes.js';
import { validateRouter } from './routes/validate.routes.js';
import { historyRouter } from './routes/history.routes.js';
dotenv.config();

const app=express();
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