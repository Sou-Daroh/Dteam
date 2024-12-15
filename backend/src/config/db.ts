import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 5000; // 5 seconds

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dteam', {
        serverSelectionTimeoutMS: 5000
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error: unknown) {
      if (i === MAX_RETRIES - 1) {
        if (error instanceof Error) {
          console.error(`Final connection attempt failed: ${error.message}`);
        }
        process.exit(1);
      }
      console.log(`Connection attempt ${i + 1} failed, retrying in ${RETRY_DELAY/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

export default connectDB;