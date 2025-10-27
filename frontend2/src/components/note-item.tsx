import type { Note } from "@/types";
import { useState } from "react";
import useShowFormattedDate from "@/hooks/use-show-formatted-date";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Edit, Trash } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const NoteItem = ({
  note,
  onDelete,
  onUpdate,
  setNotes,
}: {
  note: Note;
  onDelete: (
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: number
  ) => Promise<void>;
  onUpdate: (
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    id: number,
    updateTitle: string,
    updateContent: string
  ) => Promise<void>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleEdited, setTitleEdited] = useState<string>(note.title);
  const [contentEdited, setContentEdited] = useState<string>(note.content);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleCancel = () => {
    setIsEditing(false);
    setTitleEdited(note.title);
    setContentEdited(note.content);
  };

  const { showFormattedDate } = useShowFormattedDate();

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center text-sm">
          <Card>
            <CardContent>
              <div className="w-[300px]">
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
                          onUpdate(
                            setNotes,
                            note.id,
                            titleEdited,
                            contentEdited
                          );
                          setIsEditing(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-xl font-title-note">
                      {note.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      ~{showFormattedDate(note.created_at)}
                    </p>
                    <p className="mt-2 font-content-note">{note.content}</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-fit">
          <ContextMenuItem
            inset
            onClick={() => setIsEditing(true)}
            className="!px-2"
          >
            <div className="flex items-center gap-2">
              <Edit className="w-4 h-4 mt-0.5" />
              <span>Edit</span>
            </div>
          </ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem
              inset
              disabled={isEditing ? true : false}
              className="!px-2"
              // onClick={() => onDelete(setNotes, note.id)}
            >
              <div className="flex items-center gap-2">
                <Trash className="w-4 h-4 mt-0.5" color="#fb2c36" />
                <span className="text-red-500">Delete</span>
              </div>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={() => setDialog(false)}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteItem;
