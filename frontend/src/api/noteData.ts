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

async function sendAddNote() {
    await fetch("http://localhost:8080/api/v1/note-data/add-note", {
        ...fetchOptionsPUT,
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendDeleteNote(noteID: number) {
    await fetch("http://localhost:8080/api/v1/note-data/delete-note", {
        ...fetchOptionsPUT,
        body: JSON.stringify(noteID),
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendUpdateNotePositions(changeLog: number[][]) {
    await fetch("http://localhost:8080/api/v1/note-data/update-note-positions", {
        ...fetchOptionsPUT,
        body: JSON.stringify(changeLog),
    })
    .catch((error) => {
        console.error(error);
    });
}


export { fetchNoteData, sendSetNote, sendAddNote, sendDeleteNote, sendUpdateNotePositions };