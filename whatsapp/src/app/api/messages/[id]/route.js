import Message from "@/Models/Message"; // Assuming Message is the correct model name
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id || !id.includes('=')) {
      return NextResponse.json({ error: "Invalid ID parameter format in URL" });
    }

    // Extract the value after the '=' sign
    const idValue = id.split('=')[1];

    const messages = await Message.find({ conversationId: idValue });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
