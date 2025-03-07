// src/components/second-brain/NoteView.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useNotes, Note } from "@/context/notes-context";
import { Edit, Check, X, Tag, Plus } from "lucide-react"; // Import icons if you have lucide

interface NoteViewProps {
  noteId: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export default function NoteView({
  noteId,
  isEditing,
  setIsEditing,
}: NoteViewProps) {
  const { notes, updateNote } = useNotes();
  const [note, setNote] = useState<Note | null>(null);

  // For editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Debounced auto-save
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Find the note when noteId changes
  useEffect(() => {
    const foundNote = notes.find((n) => n.id === noteId);
    setNote(foundNote || null);

    // Initialize editing state
    if (foundNote) {
      setTitle(foundNote.title);
      setContent(foundNote.content);
      setTags([...foundNote.tags]);
    }
  }, [noteId, notes]);

  // Auto-save when editing
  useEffect(() => {
    if (isEditing && note) {
      // Clear any existing timeout
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set a new timeout for auto-saving
      const timeout = setTimeout(() => {
        updateNote(note.id, {
          title,
          content,
          tags,
        });
      }, 1000); // Auto-save after 1 second of inactivity

      setSaveTimeout(timeout);
    }

    // Clean up timeout on unmount
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [title, content, tags, isEditing, note]);

  // Handle adding a tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!note) {
    return (
      <div className="text-center p-4">
        <p>Note not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Title - editable or display */}
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold mb-4 bg-transparent border-b border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] focus:outline-none text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
        />
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="text-[rgb(69,133,136)] hover:text-opacity-80"
          >
            <Edit size={18} />
          </button>
        </div>
      )}

      {/* Tags - editable or display */}
      {isEditing ? (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[rgb(69,133,136)]/10 text-[rgb(69,133,136)]"
              >
                <span>#{tag}</span>
                <button
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="text-[rgb(204,36,29)]"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Add tag input */}
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tag..."
                className="px-2 py-1 w-24 bg-transparent border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] rounded focus:outline-none text-sm"
              />
              <button
                onClick={handleAddTag}
                className="ml-1 text-[rgb(152,151,26)]"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mb-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-[rgb(69,133,136)]/10 text-[rgb(69,133,136)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content - editable or display */}
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[60vh] p-2 bg-transparent border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] rounded focus:outline-none font-mono text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] resize-none"
        />
      ) : (
        <div className="whitespace-pre-wrap">
          {note.content || (
            <em className="text-[rgb(102,92,84)]">
              Click the edit button to start writing...
            </em>
          )}
        </div>
      )}

      {/* Edit/Save controls */}
      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              // Force save immediately
              updateNote(note.id, { title, content, tags });
              setIsEditing(false);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded bg-[rgb(69,133,136)] text-white"
          >
            <Check size={16} />
            <span>Done</span>
          </button>
        </div>
      )}

      {/* Show created/updated timestamps */}
      <div className="mt-6 text-sm text-[rgb(102,92,84)] dark:text-[rgb(168,153,132)]">
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
