export const fetchNotes = async (setNotes) => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL);

    const result = await res.json();

    setNotes(result.data);
  } catch (error) {
    console.error("Error", error);
  }
};



export const addNote = async (newTitle, newContent, setNotes) => {
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

export const handleUpdateNote = async (id, updateTitle, updateContent) => {
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

    fetchNotes();
  } catch (error) {
    console.error("Error", error);
  }
};

export const handleDelete = async (id, setNotes) => {
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

export const getNoteById = (id) => {
  console.log(id);
};
