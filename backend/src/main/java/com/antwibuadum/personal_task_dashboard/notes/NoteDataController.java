package com.antwibuadum.personal_task_dashboard.notes;


import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("api/v1/note-data")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.PUT,RequestMethod.GET})
public class NoteDataController {
    ArrayList<Note> temporaryNoteData = new ArrayList<>();
    {
        temporaryNoteData.add(new Note(9045, "Example note\nEpic Games"));
        temporaryNoteData.add(new Note(905345, "Example note3\nE4545pic Games"));
    }

    @GetMapping
    @RequestMapping("/get-note-data")
    public ArrayList<Note> getTodoLists() {
        return temporaryNoteData;
    }

    public StringBuilder leftRightWhiteSpaceRemoval(String str) {
        boolean addToStringOne = false;
        boolean addToStringTwo = false;

        StringBuilder stringOne = new StringBuilder();
        StringBuilder stringTwo = new StringBuilder();
        StringBuilder returnString = new StringBuilder();

        for (int i = 0; i < str.length(); i++) {
            if (addToStringOne) {
                stringOne.append(str.charAt(i));
            }
            else if (str.charAt(i) != ' ' && str.charAt(i) != '\n') {
                addToStringOne = true;
                stringOne.append(str.charAt(i));
            }
        }

        for (int i = stringOne.length() - 1; i >= 0 ; i--) {
            if (addToStringTwo) {
                stringTwo.append(stringOne.charAt(i));
            }
            else if (stringOne.charAt(i) != ' ' && stringOne.charAt(i) != '\n') {
                addToStringTwo = true;
                stringTwo.append(stringOne.charAt(i));
            }
        }

        for (int i = stringTwo.length() - 1; i >= 0; i--) {
            returnString.append(stringTwo.charAt(i));
        }

        return returnString;
    }

    public static class SetNoteData {
        public int noteID;
        public String newNote;
    };
    @PutMapping
    @RequestMapping("/set-note")
    public void setNote(@RequestBody SetNoteData data) {
        for (int i = 0; i < temporaryNoteData.size(); i++) {
            if (temporaryNoteData.get(i).noteID == data.noteID) {
                StringBuilder whiteSpaceRemovedNote = leftRightWhiteSpaceRemoval(data.newNote);
                temporaryNoteData.get(i).note = whiteSpaceRemovedNote.toString();
            }
        }
    }

    @PutMapping
    @RequestMapping("/add-note")
    public void setNote(@RequestBody int newNoteID) {
        temporaryNoteData.add(new Note(newNoteID, ""));
    }

    @PutMapping
    @RequestMapping("/delete-note")
    public void deleteNote(@RequestBody int noteID) {
        System.out.println("Delete + " + noteID);
        for (int i = 0; i < temporaryNoteData.size(); i++) {
            if (temporaryNoteData.get(i).noteID == noteID) {
                temporaryNoteData.remove(i);
                break;
            }
        }
    }
}
