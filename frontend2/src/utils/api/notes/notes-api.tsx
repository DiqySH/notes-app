import type { Note } from "@/types";

export const fetchNotes = async (
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL);

    const result = await res.json();

    setNotes(result.data);
  } catch (error) {
    console.error("Error", error);
  }
};

export const addNote = async (
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  newTitle: string,
  newContent: string
) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      setNotes((notes) => [...notes, result.data]);
    }
  } catch (error) {
    console.error("Error", error);
  }
};

export const handleUpdateNote = async (
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  id: number,
  updateTitle: string,
  updateContent: string
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateTitle,
        content: updateContent,
      }),
    });
    const result = await res.json();
    console.log(result.data);

    fetchNotes(setNotes);
  } catch (error) {
    console.error("Error", error);
  }
};

export const handleDelete = async (
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  id: number
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNotes((notes) => notes.filter((note) => note.id !== id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getNoteById = (id: number) => {
  console.log(id);
};
