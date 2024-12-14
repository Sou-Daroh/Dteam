import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import gameRoutes from './routes/gameRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env['PORT'] || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});