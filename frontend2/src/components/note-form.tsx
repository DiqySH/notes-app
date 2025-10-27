import { useState } from "react";
import type { Note } from "@/types";

const NoteForm = ({
  onAddNote,
  setNotes,
}: {
  onAddNote: (
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    newTitle: string,
    newContent: string
  ) => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAddNote(setNotes, title, content);
    setTitle("");
    setContent("");
  };

  return (
    <section className="container max-w-xl px-5 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="rounded-sm outline outline-gray-400 p-3"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="resize-y min-h-14 rounded-sm outline outline-gray-400 p-3"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold rounded-lg py-3"
        >
          Add note
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
