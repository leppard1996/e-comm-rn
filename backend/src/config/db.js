import mongoose from 'mongoose';

import {env} from './env.js';

export const connectDb = async() => {
    try {
        await mongoose.connect(env.DB_URL);
        console.log('Connected to MongoDB');
    } catch(error) {
        console.error('Error connecting to MongoDB:' , error);
        process.exit(1); //exit 1 means failure, 0 means success
    }
}