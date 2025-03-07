// src/app/second-brain/new/page.tsx
"use client";

import React, { useState } from "react";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewNotePage() {
  const router = useRouter();
  const { createNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle adding a new tag
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag input keydown (add tag on Enter)
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title for your note");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the new note
      createNote({
        title,
        content,
        tags,
      });

      // Navigate back to the main page
      router.push("/second-brain");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]">
          Create New Note
        </h1>
        <Link
          href="/second-brain"
          className="text-[rgb(102,92,84)] dark:text-[rgb(168,153,132)] hover:underline"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-1 text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full p-2 border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] rounded bg-[rgb(251,241,199)] dark:bg-[rgb(40,40,40)] text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium mb-1 text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
          >
            Tags
          </label>

          {/* Tag list */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-[rgb(69,133,136)]/10 dark:bg-[rgb(131,165,152)]/20 text-[rgb(69,133,136)] dark:text-[rgb(131,165,152)]"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-[rgb(204,36,29)] dark:text-[rgb(251,73,52)]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tag input */}
          <div className="flex">
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tag..."
              className="flex-1 p-2 border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] rounded-l bg-[rgb(251,241,199)] dark:bg-[rgb(40,40,40)] text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded-r bg-[rgb(152,151,26)] dark:bg-[rgb(184,187,38)] text-white dark:text-[rgb(40,40,40)]"
            >
              Add
            </button>
          </div>
        </div>

        {/* Content textarea */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-1 text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)]"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note... Use Markdown for formatting. Link to other notes with [[note title]]."
            rows={10}
            className="w-full p-3 border border-[rgb(213,196,161)] dark:border-[rgb(80,73,69)] rounded bg-[rgb(251,241,199)] dark:bg-[rgb(40,40,40)] text-[rgb(60,56,54)] dark:text-[rgb(235,219,178)] font-mono"
          />
          <p className="mt-1 text-xs text-[rgb(102,92,84)] dark:text-[rgb(168,153,132)]">
            Use Markdown syntax: # Heading, ## Subheading, **bold**, *italic*.
            Link to other notes with [[Note Title]].
          </p>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-[rgb(69,133,136)] dark:bg-[rgb(131,165,152)] text-white dark:text-[rgb(40,40,40)] rounded ${
              isSubmitting ? "opacity-70" : "hover:bg-opacity-90"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
