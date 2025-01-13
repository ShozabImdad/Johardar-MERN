import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/User.js'
import productRoutes from './routes/Product.js'
import authRoues from './routes/auth.js'
import cors from 'cors'

// Load env vars
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/products/", productRoutes)
app.use("/api/auth", authRoues)

//Error Handling Middleware

connectDB();
const PORT = process.env.PORT || 5972;
app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
});