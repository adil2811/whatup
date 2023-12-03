import Conversation from "@/Models/Conversation";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const queryParams = {};

    id.forEach(param => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    });


    // Access specific values

    const senderId = queryParams.senderId;
    const receiverId = queryParams.receiverId;

    // Check if both senderId and receiverId exist
    if (!senderId || !receiverId) {
      return NextResponse.json({ error: 'Both senderId and receiverId are required' });
    }

    // Check if senderId and receiverId are the same
    if (senderId === receiverId) {
      return NextResponse.json({ error: 'SenderId and receiverId cannot be the same' });
    }

    // Assuming ConversationModel is your Conversation schema/model
    // Fetch conversation from the database
    const conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] }});

    if (!conversation) {
      return NextResponse.json({ message: 'Conversation not found' });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
