import Conversation from "@/Models/Conversation";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  
  try {
    const data = await request.json();
    console.log("recived data",data)
    console.log('Sender  IDs:', data.senderId);
    console.log('receiver IDs:',  data.receiverId);

    // Check if both senderId and receiverId exist
    if (data.senderId && data.receiverId) {
      // Check for existing conversation
      const existingConversation = await Conversation.findOne({
        members: { $all: [data.senderId, data.receiverId] }
      });

      if (existingConversation) {
        return NextResponse.json('Conversation already exists');
      }

      // Create a new conversation if no existing conversation found
      const newConversation = new Conversation({
        members: [data.senderId, data.receiverId]
      });

      const savedConversation = await newConversation.save();
      return NextResponse.json(savedConversation);
    } else {
      return NextResponse.json('Both senderId and receiverId are required');
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}










