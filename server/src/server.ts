import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { connectDB } from './config/db.config';

dotenv.config({ path: '../.env' }); // Adjust path based on directory structure
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use('/api',authRoutes);
connectDB();
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running o port ${PORT}`));