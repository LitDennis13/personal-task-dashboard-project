import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import type { NoteType } from "../App/App";
import styles from "./notes.module.css";
import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import NoteEditorCloseSoundEffect from "../../assets/audio/note_editor_close_sound_effect.mp3";

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

    let [notesData, setNotesData] = useOutletContext<any>()[6];
    let [newID, setNewID] = useOutletContext<any>()[5];

    let mainPage = useRef<HTMLDivElement>(null);
    let [scrollBarPadding, setScrollBarPadding] = useState(false);

    let editNoteDialog = useRef<HTMLDialogElement>(null);
    let editNoteArea = useRef<HTMLTextAreaElement>(null);
    let [selectedNoteIndex, setSelectedNoteIndex] = useOutletContext<any>()[9];

    let [pressedNoteDelete, setPressedNoteDelete] = useState(false);

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

    function loadNotes() {
        let returnData: any[] = [];

        for (let i = 0; i < notesData.length; i++) {
            let foundNewLine = false;
            let title = "";
            let note = "";
            for (const c of (notesData[i] as NoteType).note) {
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

            let noteEntry = <button key={i} className={styles.noteEntry + " " + styles.notePageNoteEntry} onClick={() => showNoteEditor(i)}>
                <textarea className={styles.title} value={title === "" ? "Untitled Note" : title} readOnly></textarea>
                <textarea className={styles.note} value={note} readOnly></textarea>
            </button>;
            returnData.push(noteEntry);
        }
        return returnData;
    }

    function addNoteButtonOnClick() {
        checkAndHandleScrollBarLoaded();

        let newNote: NoteType = {
            noteID: newID,
            note: "",
        };

        notesData.push(newNote);

        showNoteEditor(notesData.length - 1);

        setNotesData([...notesData]);
        setNewID(newID + 1);
    }

    function loadAddNoteButton() {
        return <button className={styles.addNoteButton} onClick={() => addNoteButtonOnClick()}>
            <img src={AddNoteIcon} alt="Add Note Button" />
            <p>Add Note</p>
        </button>;
    }

    function noteEditorValue() {
        if (selectedNoteIndex == -1) {
            return "";
        }
        else {
            return (notesData[selectedNoteIndex] as NoteType).note;
        }
    }
    
    function noteEditorOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        (notesData[selectedNoteIndex] as NoteType).note = event.target.value;

        setNotesData([...notesData]);
    }

    function closeNoteEditor() {
        if (editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.close();
            playNoteEditorCloseSoundEffect();
            setSelectedNoteIndex(-1);
            setNotesData([...notesData]);
            setPressedNoteDelete(false);
        }
    }

    function onDeleteNotePress() {
        setPressedNoteDelete(true);
    }

    function onConfirmDeleteNote() {
        closeNoteEditor();
        notesData.splice(selectedNoteIndex, 1);
        setNotesData([...notesData]);
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

    function onDialogClick(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
        if ((event.target as Element).id !== EDIT_NOTE_AREA_ID && (event.target as Element).id !== EDIT_NOTE_AREA_DIV_ID && (event.target as Element).id !== DELETE_NOTE_BUTTON_ID && editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            (notesData[selectedNoteIndex] as NoteType).note = leftRightWhiteSpaceRemoval((notesData[selectedNoteIndex] as NoteType).note);
            closeNoteEditor();
        }

        if ((event.target as Element).id !== DELETE_NOTE_BUTTON_ID) {
            setPressedNoteDelete(false);
        }
    }

    useEffect(() => {
        checkAndHandleScrollBarLoaded();
    }, []);

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