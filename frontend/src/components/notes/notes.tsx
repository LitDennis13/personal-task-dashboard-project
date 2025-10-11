import { useEffect, useRef, useState } from "react";

import { useLocalNotesDataStore, useSelectedNoteIDStore } from "../../store";

import styles from "./notes.module.css";

import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import NoteEditorCloseSoundEffect from "../../assets/audio/note_editor_close_sound_effect.mp3";
import { useNewID } from "../custom_hooks/use_newID";
import { useNoteData } from "../custom_hooks/use_noteData";


function playNoteEditorCloseSoundEffect() {
    new Audio(NoteEditorCloseSoundEffect).play();
}

function Notes() {
    const EDIT_NOTE_AREA_DIV_ID = "EditNoteAreaDiv";
    const EDIT_NOTE_AREA_ID = "EditNoteArea";
    const DELETE_NOTE_BUTTON_ID = "DeleteNoteButton";

    const newID = useNewID();

    const selectedNoteID = useSelectedNoteIDStore((state) => state.value);

    const [noteSpaceValue, setNoteSpaceValue] = useState("");

    const notesData = useNoteData();

    const localNotesData = useLocalNotesDataStore((state) => state.value);

    const [notePositionChangeLog, setNotePositionChangeLog] = useState<number[][]>([]);
    
    const mainPage = useRef<HTMLDivElement>(null);
    const [scrollBarPadding, setScrollBarPadding] = useState(false);

    const editNoteDialog = useRef<HTMLDialogElement>(null);
    const editNoteArea = useRef<HTMLTextAreaElement>(null);

    const [pressedNoteDelete, setPressedNoteDelete] = useState(false);

    const [noteIDBeingDragged, setNoteIDBeingDragged] = useState(-1);
    const [recentlyDraggedOverNoteID, setRecentlyDraggedOverNoteID] = useState(-1);

    function checkAndHandleScrollBarLoaded() {
        if (mainPage !== null && mainPage.current instanceof HTMLDivElement) {
            if (mainPage.current.scrollHeight > mainPage.current.clientHeight) {
                setScrollBarPadding(true);
            }
            else {
                setScrollBarPadding(false);
            }
        }
    }

    function showNoteEditor(noteID: number) {
        if (editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.showModal();
            selectedNoteID.setSelectedNoteID(noteID);

            for (const note of localNotesData.data) {
                if (note.noteID === noteID) {
                    setNoteSpaceValue(note.note);
                }
            }
        }
    }

    function onNoteDragStart(draggingNoteID: number) {
        setNoteIDBeingDragged(draggingNoteID);
        setRecentlyDraggedOverNoteID(draggingNoteID);
    }


    function onNoteDragOver(event: React.DragEvent<HTMLButtonElement>, noteIDBeingDraggedOver: number) {
        event.preventDefault();
        
        if (noteIDBeingDraggedOver !== recentlyDraggedOverNoteID) {     
            let noteBeingDraggedIndex = -1;
            let noteBeingDraggedOverIndex = -1;

            for (let i = 0; i < localNotesData.data.length; i++) {
                if (localNotesData.data[i].noteID === noteIDBeingDragged) {
                    noteBeingDraggedIndex = i;
                }
                if (localNotesData.data[i].noteID === noteIDBeingDraggedOver) {
                    noteBeingDraggedOverIndex = i;
                }
            }

            setNotePositionChangeLog([...notePositionChangeLog, [noteIDBeingDraggedOver, noteIDBeingDragged]]);

            localNotesData.updateNotePosition(noteIDBeingDraggedOver, noteBeingDraggedOverIndex, noteIDBeingDragged, noteBeingDraggedIndex);
            setRecentlyDraggedOverNoteID(noteIDBeingDraggedOver);
            setNoteIDBeingDragged(noteIDBeingDraggedOver);
        }
    }

    async function onNoteDrop() {
        await notesData.updateNotePositions(notePositionChangeLog);
        setNotePositionChangeLog([]);
    }

    function loadNotes() {
        let returnData: any[] = [];

        for (let i = 0; i < localNotesData.data.length; i++) {
            let foundNewLine = false;
            let title = "";
            let note = "";

            const rawNoteData = (localNotesData.data[i].noteID === selectedNoteID.data) ? noteSpaceValue : localNotesData.data[i].note;

            for (const c of rawNoteData) {
                if (c === "\n" && !foundNewLine) {
                    foundNewLine = true;
                }
                else if (!foundNewLine) {
                    title += c;
                }
                else {
                    note += c;
                }
            }

            let noteEntry = <button key={i} className={styles.noteEntry + " " + styles.notePageNoteEntry} onClick={() => showNoteEditor(localNotesData.data[i].noteID)}
                draggable="true" onDragStart={() => onNoteDragStart(localNotesData.data[i].noteID)} onDragOver={(event) => onNoteDragOver(event, localNotesData.data[i].noteID)} onDrop={() => onNoteDrop()}>
                
                <textarea className={styles.title} value={title === "" ? "Untitled Note" : title} readOnly></textarea>
                <textarea className={styles.note} value={note} readOnly></textarea>
            </button>;
            returnData.push(noteEntry);
        }
        return returnData;
    }

    async function addNoteButtonOnClick() {
        checkAndHandleScrollBarLoaded();

        await notesData.addNote(newID.data);
        showNoteEditor(newID.data);        
    }

    function loadAddNoteButton() {
        return <button className={styles.addNoteButton} onClick={() => addNoteButtonOnClick()}>
            <img src={AddNoteIcon} alt="Add Note Button" />
            <p>Add Note</p>
        </button>;
    }

    function closeNoteEditor() {
        if (editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.close();
            playNoteEditorCloseSoundEffect();
            selectedNoteID.setSelectedNoteID(-1);
            setNoteSpaceValue("");
            setPressedNoteDelete(false);
        }
    }

    function onDeleteNotePress() {
        setPressedNoteDelete(true);
    }

    async function onConfirmDeleteNote() {
        await notesData.deleteNote(selectedNoteID.data);
        closeNoteEditor();
        setPressedNoteDelete(false);
    }

    function loadDeleteButton() {
        if (pressedNoteDelete) {
            return <button id={DELETE_NOTE_BUTTON_ID} onClick={() => onConfirmDeleteNote()}>Confirm</button>;
        }
        else {
            return <button id={DELETE_NOTE_BUTTON_ID} onClick={() => onDeleteNotePress()}>Delete Note</button>;
        }
    }

    function onDialogClick(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
        if ((event.target as Element).id !== EDIT_NOTE_AREA_ID && (event.target as Element).id !== EDIT_NOTE_AREA_DIV_ID && (event.target as Element).id !== DELETE_NOTE_BUTTON_ID && editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            
            notesData.setNote({noteID: selectedNoteID.data, newNote: noteSpaceValue});
            closeNoteEditor();
        }

        if ((event.target as Element).id !== DELETE_NOTE_BUTTON_ID) {
            setPressedNoteDelete(false);
        }
    }

    useEffect(() => {
        console.log(newID.data);
    }, [newID]);

    useEffect(() => {
        if (!notesData.loadingNoteData){
            localNotesData.setNotesData(notesData.data);
        }
    }, [notesData.loadingNoteData, notesData.data]);

    useEffect(() => {
        checkAndHandleScrollBarLoaded();
    }, [notesData.data]);

    useEffect(() => {
        if (selectedNoteID.data !== -1) {
            showNoteEditor(selectedNoteID.data);
        }
    }, []);
    
    return !notesData.loadingNoteData ? <div ref={mainPage} className={styles.mainPage + " " + (scrollBarPadding ? styles.mainPageWithScrollBar : styles.mainPageNoScrollBar)}>
        {loadNotes()}
        {loadAddNoteButton()}

        <dialog ref={editNoteDialog} className={styles.editNoteDialog} onMouseDown={(event) => onDialogClick(event)}>
            <div id={EDIT_NOTE_AREA_DIV_ID}>
                <textarea id={EDIT_NOTE_AREA_ID} ref={editNoteArea} value={noteSpaceValue} placeholder="Untitled Note" onChange={(event) => setNoteSpaceValue(event.target.value)}></textarea>
                {loadDeleteButton()}
            </div>
        </dialog>
    </div> : "";
}

export default Notes;