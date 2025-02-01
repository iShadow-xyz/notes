"use client";

import { useState, useEffect } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    setTitle("");
    setContent("");
    setEditingId(null);
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-transparent">
      <div className="max-w-4xl w-full mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Simple Note App</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full mb-2 p-2 rounded bg-transparent border border-[#dadada30]"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            className="w-full mb-2 p-2 rounded bg-transparent border border-[#dadada30]"
            required
          />
          <button
            type="submit"
            className="bg-red-400 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border border-[#dadada30] p-4 rounded"
            >
              <h2 className="font-bold">{note.title}</h2>
              <p className="mb-2">{note.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-red-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-400 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
