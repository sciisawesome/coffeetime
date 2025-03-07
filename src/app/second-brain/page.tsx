// First, let's update the /second-brain/page.tsx file to handle creating empty notes

// src/app/second-brain/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useNotes } from "@/context/notes-context";
import { PlusCircle } from "lucide-react"; // Import icon if you have lucide
import NoteView from "@/components/second-brain/NoteView";

export default function SecondBrainPage() {
  const { notes, createNote } = useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Choose the first note by default if available
  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [notes, selectedNoteId]);

  // Handle creating a new empty note
  const handleCreateNote = () => {
    // Create empty note
    const newNote = createNote({
      title: "Untitled Note",
      content: "",
      tags: [],
    });

    // Select the new note and enable editing
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
  };

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] dark:bg-[rgb(60,56,54)] p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notes</h2>
          <button
            onClick={handleCreateNote}
            className="text-[rgb(69,133,136)] hover:text-opacity-80 flex items-center"
          >
            <PlusCircle size={18} />
            <span className="ml-1">New</span>
          </button>
        </div>

        {/* Note list */}
        <div className="space-y-1">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNoteId(note.id);
                setIsEditing(false); // Exit editing mode when switching notes
              }}
              className={`p-2 rounded cursor-pointer ${
                selectedNoteId === note.id
                  ? "bg-[rgb(204,36,29)] text-white"
                  : "hover:bg-[rgb(251,241,199)]"
              }`}
            >
              <h3 className="font-medium">{note.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        {selectedNoteId ? (
          <NoteView
            noteId={selectedNoteId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="text-center p-12">
            <h2 className="text-xl mb-4">Welcome to your Second Brain</h2>
            <p>Click "New" to create your first note</p>
          </div>
        )}
      </div>
    </div>
  );
}
