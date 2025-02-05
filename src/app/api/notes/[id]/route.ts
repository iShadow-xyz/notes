import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { title, content } = await request.json();
    const note = await Note.findByIdAndUpdate(
      params.id,
      { title, content },
      { new: true }
    );
    return NextResponse.json(note);
  } catch (_error: any) {
    return NextResponse.json(
      { error: _error.message || "Error updating note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Note.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (_error: any) {
    return NextResponse.json(
      { error: _error.message || "Error deleting note" },
      { status: 500 }
    );
  }
}
