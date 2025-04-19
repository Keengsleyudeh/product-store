import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Connect to the database using the connection string from the environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully. ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure, 0 is success
    }
};