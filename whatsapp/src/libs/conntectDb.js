// db.js
import mongoose from 'mongoose';

let isConnected;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const dbConnection = await mongoose.connect("mongodb+srv://wup627106:adil215215@cluster0.o4lqwxy.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = dbConnection.connections[0].readyState;
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export default connectDB;
