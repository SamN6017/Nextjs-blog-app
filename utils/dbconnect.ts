import mongoose from 'mongoose';

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    try {
        const mongooseInstance = await mongoose.connect(process.env.MONGODB_URI);
        cachedConnection = mongooseInstance.connection;
        cachedConnection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        cachedConnection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        cachedConnection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            cachedConnection = null;
        });

        return cachedConnection;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
