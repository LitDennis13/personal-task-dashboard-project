import { useEffect, useRef, useState } from "react";

import { useNotesDataStore, useSelectedNoteIndexStore } from "../../store";

import styles from "./notes.module.css";

import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import NoteEditorCloseSoundEffect from "../../assets/audio/note_editor_close_sound_effect.mp3";
import { useNewID } from "../custom_hooks/api_hooks/use_newID";

function leftRightWhiteSpaceRemoval(str: string) {
    let addToStringOne = false;
    let addToStringTwo = false;

    let stringOne = "";
    let stringTwo = "";
    let returnString = "";

    for (let i = 0; i < str.length; i++) {
        if (addToStringOne) {
            stringOne += str[i];
        }
        else if (str[i] !== " " && str[i] !== "\n") {
            addToStringOne = true;
            stringOne += str[i];
        }
    }

    for (let i = stringOne.length - 1; i >= 0 ; i--) {
        if (addToStringTwo) {
            stringTwo += stringOne[i];
        }
        else if (stringOne[i] !== " " && stringOne[i] !== "\n") {
            addToStringTwo = true;
            stringTwo += stringOne[i];
        }
    }

    for (let i = stringTwo.length - 1; i >= 0; i--) {
        returnString += stringTwo[i];
    }

    return returnString;
}

function playNoteEditorCloseSoundEffect() {
    new Audio(NoteEditorCloseSoundEffect).play();
}

function Notes() {
    const EDIT_NOTE_AREA_DIV_ID = "EditNoteAreaDiv";
    const EDIT_NOTE_AREA_ID = "EditNoteArea";
    const DELETE_NOTE_BUTTON_ID = "DeleteNoteButton";

    const [newID, incrementNewID] = useNewID();
    

    const notesData = useNotesDataStore((state) => state.value);
    const addNewNote = useNotesDataStore((state) => state.addNewNote);
    const updateNote = useNotesDataStore((state) => state.updateNote);
    const deleteNote = useNotesDataStore((state) => state.deleteNote);
    const updateNotePosition = useNotesDataStore((state) => state.updateNotePosition);


    const selectedNoteIndex = useSelectedNoteIndexStore((state) => state.value);
    const setSelectedNoteIndex = useSelectedNoteIndexStore((state) => state.setSelectedTodoID);


    const mainPage = useRef<HTMLDivElement>(null);
    const [scrollBarPadding, setScrollBarPadding] = useState(false);

    const editNoteDialog = useRef<HTMLDialogElement>(null);
    const editNoteArea = useRef<HTMLTextAreaElement>(null);

    const [pressedNoteDelete, setPressedNoteDelete] = useState(false);

    const [noteIDBeingDragged, setNoteIDBeingDragged] = useState(-1);
    const [recentlyDraggedOverNoteID, setRecentlyDraggedOverNoteID] = useState(-1);

    /* This function checks if the scroll bar is loaded by checking whether the height of the scroll bar is
    greater than the height of the div on the page. If the scroll bar is greater then the "scrollBarPadding"
    state is set to true, otherwise it is false */
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

    function showNoteEditor(noteIndex: number) {
        if (editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.showModal();
            setSelectedNoteIndex(noteIndex);
        }
    }

    /* This function sets the "noteIDBeingDragged" state to the note id that the user has started dragging
    and it sets the "recentlyDraggedOverNoteID" state to the note id that the user is dragging as well
    to signal that the most recent note that was dragged over was itself */
    function onNoteDragStart(draggingNoteID: number) {
        setNoteIDBeingDragged(draggingNoteID);
        setRecentlyDraggedOverNoteID(draggingNoteID);
    }

    /* This function swaps the note id's of the note being dragged and the note being dragged over and then the note data gets
    sorted by id to change the position of the notes */
    function onNoteDragOver(event: React.DragEvent<HTMLButtonElement>, noteIDBeingDraggedOver: number) {
        event.preventDefault();
        
        if (noteIDBeingDraggedOver !== recentlyDraggedOverNoteID) {     
            let noteBeingDraggedIndex = -1;
            let noteBeingDraggedOverIndex = -1;

            for (let i = 0; i < notesData.length; i++) {
                if (notesData[i].noteID === noteIDBeingDragged) {
                    noteBeingDraggedIndex = i;
                }
                if (notesData[i].noteID === noteIDBeingDraggedOver) {
                    noteBeingDraggedOverIndex = i;
                }
            }

            updateNotePosition(noteIDBeingDraggedOver, noteBeingDraggedOverIndex, noteIDBeingDragged, noteBeingDraggedIndex);
            setRecentlyDraggedOverNoteID(noteIDBeingDraggedOver);
            setNoteIDBeingDragged(noteIDBeingDraggedOver);
        }
    }

    /* This function loads the notes onto the screen. The title for the note are the characters that come before the
    first new line character and all subsequent characters are part of the note body */
    function loadNotes() {
        let returnData: any[] = [];

        for (let i = 0; i < notesData.length; i++) {
            let foundNewLine = false;
            let title = "";
            let note = "";
            for (const c of notesData[i].note) {
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

            let noteEntry = <button key={i} className={styles.noteEntry + " " + styles.notePageNoteEntry} onClick={() => showNoteEditor(i)}
                draggable="true" onDragStart={() => onNoteDragStart(notesData[i].noteID)} onDragOver={(event) => onNoteDragOver(event, notesData[i].noteID)}>
                
                <textarea className={styles.title} value={title === "" ? "Untitled Note" : title} readOnly></textarea>
                <textarea className={styles.note} value={note} readOnly></textarea>
            </button>;
            returnData.push(noteEntry);
        }
        return returnData;
    }

    async function addNoteButtonOnClick() {
        checkAndHandleScrollBarLoaded();

        if (typeof newID === "number") addNewNote(newID);
        showNoteEditor(notesData.length);
        
        await incrementNewID();
    }

    function loadAddNoteButton() {
        return <button className={styles.addNoteButton} onClick={() => addNoteButtonOnClick()}>
            <img src={AddNoteIcon} alt="Add Note Button" />
            <p>Add Note</p>
        </button>;
    }

    function noteEditorValue() {
        if (selectedNoteIndex === -1) {
            return "";
        }
        else {
            return notesData[selectedNoteIndex].note;
        }
    }
    
    function noteEditorOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        updateNote(selectedNoteIndex, event.target.value);
    }

    /* This function closes the note editor by closing the modal and setting the "selectedNoteIndex" state
    to -1 to indicate there is no note selected */
    function closeNoteEditor() {
        if (editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.close();
            playNoteEditorCloseSoundEffect();
            setSelectedNoteIndex(-1);
            setPressedNoteDelete(false);
        }
    }

    function onDeleteNotePress() {
        setPressedNoteDelete(true);
    }

    function onConfirmDeleteNote() {
        closeNoteEditor();
        deleteNote(selectedNoteIndex);
        setPressedNoteDelete(false);
        setSelectedNoteIndex(-1);
    }

    function loadDeleteButton() {
        if (pressedNoteDelete) {
            return <button id={DELETE_NOTE_BUTTON_ID} onClick={() => onConfirmDeleteNote()}>Confirm</button>;
        }
        else {
            return <button id={DELETE_NOTE_BUTTON_ID} onClick={() => onDeleteNotePress()}>Delete Note</button>;
        }
    }

    /* This function runs every time a click happens when the note editing modal is open and it checks if the click
    happened outside of the modal. If the click happens outside the modal then the "closeNoteEditor" function runs.
    This function also checks if anything but the delete button was pressed, if the delete button was not pressed it
    resets the delete button back to delete */
    function onDialogClick(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
        if ((event.target as Element).id !== EDIT_NOTE_AREA_ID && (event.target as Element).id !== EDIT_NOTE_AREA_DIV_ID && (event.target as Element).id !== DELETE_NOTE_BUTTON_ID && editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            updateNote(selectedNoteIndex, leftRightWhiteSpaceRemoval(notesData[selectedNoteIndex].note));
            closeNoteEditor();
        }

        if ((event.target as Element).id !== DELETE_NOTE_BUTTON_ID) {
            setPressedNoteDelete(false);
        }
    }

    /* This effect runs everytime a change is made to "notesData" and runs the "checkAndHandleScrollBarLoaded"
    function to see whether the scroll bar has loaded or not */
    useEffect(() => {
        checkAndHandleScrollBarLoaded();
    }, [notesData]);

    /* This effect runs only one time when the page loads and checks if the "selectedNoteIndex" state
    has a value other then -1. If so the notes editor opens when the page loads, otherwise nothing happens */
    useEffect(() => {
        if (selectedNoteIndex !== -1) {
            showNoteEditor(selectedNoteIndex);
        }
    }, []);
    
    return <div ref={mainPage} className={styles.mainPage + " " + (scrollBarPadding ? styles.mainPageWithScrollBar : styles.mainPageNoScrollBar)}>
        {loadNotes()}
        {loadAddNoteButton()}

        <dialog ref={editNoteDialog} className={styles.editNoteDialog} onMouseDown={(event) => onDialogClick(event)}>
            <div id={EDIT_NOTE_AREA_DIV_ID}>
                <textarea id={EDIT_NOTE_AREA_ID} ref={editNoteArea} value={noteEditorValue()} placeholder="Untitled Note" onChange={(event) => noteEditorOnChange(event)}></textarea>
                {loadDeleteButton()}
            </div>
        </dialog>
    </div>
}

export default Notes;