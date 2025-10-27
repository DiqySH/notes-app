import { useState, useEffect } from "react";
import type { Note } from "./types";
import {
  addNote,
  fetchNotes,
  handleDelete,
  handleUpdateNote,
} from "./utils/api/notes/notes-api";
import NoteForm from "./components/note-form";
import Navbar from "./components/navbar";
import NoteList from "./components/note-list";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes(setNotes);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col mt-24 items-center">
        <NoteForm onAddNote={addNote} setNotes={setNotes} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdateNote}
          setNotes={setNotes}
        />
      </main>
    </>
  );
}

export default App;