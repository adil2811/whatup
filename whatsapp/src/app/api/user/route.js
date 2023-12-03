// pages/api/userData.js
import { MongoClient } from 'mongodb';
import UserDataModel from '@/Models/User';
import { NextResponse } from 'next/server';
import mongoose from "mongoose";






export async function POST(req) {
  try {
    mongoose.connect('mongodb+srv://wup627106:adil215215@cluster0.o4lqwxy.mongodb.net/?retryWrites=true&w=majority');

    const userData = req.body;

    // Check if the email already exists in the database
    const existingUser = await UserDataModel.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' });
    }

    // Create a new document in the database using the UserDataModel
    const newUser = new UserDataModel(userData);
    await newUser.save();

    // Respond with a success message
    return NextResponse.json({ message: 'User data saved successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error handling user data', error: error.message });
  }
}


export async function GET() {
  try {
    mongoose.connect('mongodb+srv://wup627106:adil215215@cluster0.o4lqwxy.mongodb.net/?retryWrites=true&w=majority');

    const users = await UserDataModel.find();

    // Close the database connection after fetching data

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user data', error: error.message });
  }
}
