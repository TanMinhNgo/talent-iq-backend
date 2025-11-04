import mongoose from 'mongoose';
import { ENV } from './env.js';

const MONGO_URI = ENV.MONGODB_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log('Successfully connect to database:', conn.connection.host)
    } catch (error) {
        console.error('💥 Error connecting to the database', error);
    }
}