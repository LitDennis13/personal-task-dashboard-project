package com.antwibuadum.personal_task_dashboard.notes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Note {
    @Id
    Integer noteID;
    String note;

    public Note() {
    }

    public Note(Integer noteID, String note) {
        this.noteID = noteID;
        this.note = note;
    }

    public Integer getNoteID() {
        return noteID;
    }

    public void setNoteID(Integer noteID) {
        this.noteID = noteID;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Note note1 = (Note) o;
        return Objects.equals(noteID, note1.noteID) && Objects.equals(note, note1.note);
    }

    @Override
    public int hashCode() {
        return Objects.hash(noteID, note);
    }
}
