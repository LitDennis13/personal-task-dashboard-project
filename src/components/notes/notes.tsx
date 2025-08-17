import styles from "./notes.module.css";
import AddNoteIcon from "../../assets/images/add_note_icon.svg";

function Notes() {

    function loadAddNoteButton() {
        return <button className={styles.addNoteButton} >
            <img src={AddNoteIcon} alt="Add Note Button" />
            <p>Add Note</p>
        </button>;
         
    }

    return <div className={styles.mainPage}>
        
        {loadAddNoteButton()}
    </div>
}

export default Notes;