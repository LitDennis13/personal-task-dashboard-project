import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import styles from "./notes.module.css";
import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import type { NoteType } from "../App/App";

function Notes() {
    let [notesData, setNotesData] = useOutletContext<any>()[6];
    let [newID, setNewID] = useOutletContext<any>()[5];

    let mainPage = useRef<HTMLDivElement>(null);
    let [scrollBarPadding, setScrollBarPadding] = useState(false);

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

            let noteEntry = <button key={i} className={styles.noteEntry}>
                <textarea className={styles.title} value={title} readOnly></textarea>
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

    useEffect(() => {
        checkAndHandleScrollBarLoaded();
    }, []);

    return <div ref={mainPage} className={styles.mainPage + " " + (scrollBarPadding ? styles.mainPageWithScrollBar : styles.mainPageNoScrollBar)}>
        {loadNotes()}
        {loadAddNoteButton()}
    </div>
}

export default Notes;