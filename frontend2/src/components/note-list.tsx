import type { Note } from "@/types";
import NoteItem from "./note-item";

const NoteList = ({
  notes,
  onUpdate,
  onDelete,
  setNotes,
}: {
  notes: Note[];
  onUpdate: (
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: number,
    updateTitle: string,
    updateContent: string
  ) => Promise<void>;
  onDelete: (
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: number
  ) => Promise<void>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  return (
    <section className="container py-8 px-4">
      <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
        <img src="/note.svg" alt="note icon" className="w-8 h-8" />
        Notes
      </h2>
      <div className="flex flex-wrap gap-8">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              setNotes={setNotes}
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <h1>Data Kosong</h1>
        )}
      </div>
    </section>
  );
};

export default NoteList