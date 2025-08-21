import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import styles from "./notes.module.css";
import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import type { NoteType } from "../App/App";

function Notes() {
    const EDIT_NOTE_AREA_DIV_ID = "EditNoteAreaDiv";
    const EDIT_NOTE_AREA_ID = "EditNoteArea";

    let [notesData, setNotesData] = useOutletContext<any>()[6];
    let [newID, setNewID] = useOutletContext<any>()[5];

    let mainPage = useRef<HTMLDivElement>(null);
    let [scrollBarPadding, setScrollBarPadding] = useState(false);

    let editNoteDialog = useRef<HTMLDialogElement>(null);
    let editNoteArea = useRef<HTMLTextAreaElement>(null);
    let [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);

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

    function noteOnClick(noteIndex: number) {
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

            let noteEntry = <button key={i} className={styles.noteEntry} onClick={() => noteOnClick(i)}>
                <textarea className={styles.title} value={title === "" ? "Untitled Note" : title} readOnly></textarea>
                <textarea className={styles.note} value={note} readOnly></textarea>
            </button>;
            returnData.push(noteEntry);
        }
        return returnData;
    }

    function addNoteButtonOnClick() {
        checkAndHandleScrollBarLoaded();
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

    function onDialogClick(event: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
        if ((event.target as Element).id !== EDIT_NOTE_AREA_ID && (event.target as Element).id !== EDIT_NOTE_AREA_DIV_ID&& editNoteDialog !== null && editNoteDialog.current instanceof HTMLDialogElement) {
            editNoteDialog.current.close();
            setSelectedNoteIndex(-1);
        }
    }

    useEffect(() => {
        checkAndHandleScrollBarLoaded();
    }, []);

    return <div ref={mainPage} className={styles.mainPage + " " + (scrollBarPadding ? styles.mainPageWithScrollBar : styles.mainPageNoScrollBar)}>
        {loadNotes()}
        {loadAddNoteButton()}

        <dialog ref={editNoteDialog} className={styles.editNoteDialog} onMouseDown={(event) => onDialogClick(event)}>
            <div id={EDIT_NOTE_AREA_DIV_ID}>
                <textarea id={EDIT_NOTE_AREA_ID} ref={editNoteArea} value={noteEditorValue()} placeholder="Untitled Note" onChange={(event) => noteEditorOnChange(event)}></textarea>
            </div>
        </dialog>
    </div>
}

export default Notes;