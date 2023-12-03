import Message from "@/Models/Message";
import conversation from "@/Models/Conversation";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/libs/conntectDb";

connectDB();
export async function POST(req, res) {
  try {
    const messageData = await req.json();
   

    const newMessage = new Message(messageData); // Create a new instance of the Message model

    await newMessage.save();

    const updatedConversation = await conversation.findByIdAndUpdate(
      messageData.conversationId,
      { message: newMessage.text }
    );

    if (!updatedConversation) {
      return NextResponse.json({ message: "Conversation not found" });
    }

    return NextResponse.json({ message: "Message has been sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while processing the request",
    });
  }
}


  
