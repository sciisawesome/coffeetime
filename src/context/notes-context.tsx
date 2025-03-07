// src/context/notes-context.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./auth-context";

// Define Note type
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Define context type
interface NotesContextType {
  notes: Note[];
  createNote: (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => Note;
  updateNote: (id: string, noteData: Partial<Note>) => Note;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Provider component with properly typed children
export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Define the createNote function
  const createNote = (
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
  ): Note => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => {
      const updated = [...prev, newNote];
      localStorage.setItem("notes", JSON.stringify(updated));
      return updated;
    });

    return newNote;
  };

  // Update note function
  const updateNote = (id: string, noteData: Partial<Note>): Note => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, ...noteData, updatedAt: new Date().toISOString() }
        : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    return updatedNotes.find((note) => note.id === id)!;
  };
  return (
    <NotesContext.Provider value={{ notes, createNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
