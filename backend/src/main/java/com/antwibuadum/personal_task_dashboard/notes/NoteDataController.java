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

    public static class SetNoteData {
        public int noteID;
        public String newNote;
    };
    @PutMapping
    @RequestMapping("/set-note")
    public void setNote(@RequestBody SetNoteData data) {
        for (int i = 0; i < temporaryNoteData.size(); i++) {
            if (temporaryNoteData.get(i).noteID == data.noteID) {
                temporaryNoteData.get(i).note = data.newNote;
            }
        }
    }
}
