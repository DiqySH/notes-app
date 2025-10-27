import { useState } from "react";
import useShowFormattedDate from "../hooks/useShowFormattedDate";

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdited, setTitleEdited] = useState(note.title);
  const [contentEdited, setContentEdited] = useState(note.content);

  const handleCancel = () => {
    setIsEditing(false);
    setTitleEdited(note.title);
    setContentEdited(note.content);
  };

  const { showFormattedDate } = useShowFormattedDate

  return (
    <div className="rounded-lg shadow-md bg-white w-[300px] p-5">
      {isEditing ? (
        <>
          {" "}
          <input
            value={titleEdited}
            type="text"
            className="rounded-sm outline outline-gray-400 p-2 w-full"
            onChange={(e) => setTitleEdited(e.target.value)}
          />
          <textarea
            value={contentEdited}
            name="text"
            className="rounded-sm outline outline-gray-400 p-2 w-full mt-2"
            onChange={(e) => setContentEdited(e.target.value)}
          ></textarea>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => {
                onUpdate(note.id, titleEdited, contentEdited);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-medium text-xl">{note.title}</p>
          <p className="text-sm text-gray-500">
            ~{showFormattedDate(note.created_at)}
          </p>
          <p className="mt-2">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem