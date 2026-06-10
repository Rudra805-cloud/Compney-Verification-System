import dotenv from 'dotenv'
import express from "express"
import { authRouter } from './routes/auth.routes.js';

dotenv.config();

const app=express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!')
})

//routes
app.use('/api/auth',authRouter);


export default app;