import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, content } = await request.json();
    const note = await Note.create({ title, content });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: "Error creating note" }, { status: 500 });
  }
}
