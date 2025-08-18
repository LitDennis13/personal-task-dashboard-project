import { useOutletContext } from "react-router-dom";

import styles from "./notes.module.css";
import AddNoteIcon from "../../assets/images/add_note_icon.svg";
import type { NoteType } from "../App/App";

function Notes() {
    let [notesData, setNotesData] = useOutletContext<any>()[6];
    let [newID, setNewID] = useOutletContext<any>()[5];


    function loadNotes() {
        let returnData: any[] = [];

        for (const note of notesData) {
            let noteEntry = <button>
                {/* {(note as NoteType).note} */}
            </button>;
            returnData.push(noteEntry);
        }

        return returnData;
    }


    function loadAddNoteButton() {
        return <button className={styles.addNoteButton} >
            <img src={AddNoteIcon} alt="Add Note Button" />
            <p>Add Note</p>
        </button>;
    }

    return <div className={styles.mainPage}>
        {loadNotes()}
        {loadAddNoteButton()}
    </div>
}

export default Notes;