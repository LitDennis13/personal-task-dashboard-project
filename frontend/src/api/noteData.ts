import type { NoteType } from "../types";
import { fetchOptionsGet, fetchOptionsPUT } from "./fetchOptions";

async function fetchNoteData() {
    const returnValue = await fetch("http://localhost:8080/api/v1/note-data/get-note-data", fetchOptionsGet)
    .then((response) => response.json())
    .then((data: NoteType[]) => {
        return data;
    })
    .catch((error) => {
        console.error(error);
    });
    return returnValue;
}

type SetNoteData = {
    noteID: number;
    newNote: string;
};
async function sendSetNote(data: SetNoteData) {
    const noteID = data.noteID;
    const newNote = data.newNote;

    await fetch("http://localhost:8080/api/v1/note-data/set-note", {
        ...fetchOptionsPUT,
        body: JSON.stringify({noteID, newNote}),
    })
    .catch((error) => {
        console.error(error);
    });
}

sendSetNote({noteID: 6546, newNote: "stuff"});

export { fetchNoteData, sendSetNote };