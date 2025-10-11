package com.antwibuadum.personal_task_dashboard.notes;


import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/note-data")
@CrossOrigin(origins = "*", methods = {RequestMethod.PUT,RequestMethod.GET})
public class NoteDataController {
    private final NoteService noteService;

    public NoteDataController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    @RequestMapping("/get-note-data")
    public List<Note> getNoteData() {
        return this.noteService.getNoteData();
    }

    @PutMapping
    @RequestMapping("/set-note")
    public void setNote(@RequestBody NoteTypes.SetNoteData data) {
        this.noteService.setNote(data);
    }

    @PutMapping
    @RequestMapping("/add-note")
    public void addNote(@RequestBody int newNoteID) {
//        temporaryNoteData.add(new Note(newNoteID, ""));
        this.noteService.addNote();
    }

    @PutMapping
    @RequestMapping("/delete-note")
    public void deleteNote(@RequestBody int noteID) {
//        for (int i = 0; i < temporaryNoteData.size(); i++) {
//            if (temporaryNoteData.get(i).noteID == noteID) {
//                temporaryNoteData.remove(i);
//                break;
//            }
//        }
    }

    @PutMapping
    @RequestMapping("/update-note-positions")
    public void updateTodoPosition(@RequestBody Integer[][] changeLog) {
//        int oldNoteIndex = -1;
//        int newNoteIndex = -1;
//
//        for (int i = 0; i < changeLog.length; i++) {
//            if (!Objects.equals(changeLog[i][0], changeLog[i][1])) {
//                int oldNoteId = changeLog[i][0];
//                int newNoteId = changeLog[i][1];
//
//                for (int j = 0; j < temporaryNoteData.size(); j++) {
//                    if (Objects.equals(temporaryNoteData.get(j).getNoteID(), oldNoteId)) {
//                        oldNoteIndex = j;
//                    }
//                    if (Objects.equals(temporaryNoteData.get(j).getNoteID(), newNoteId)) {
//                        newNoteIndex = j;
//                    }
//                }
//
//                temporaryNoteData.get(oldNoteIndex).setNoteID(newNoteId);
//                temporaryNoteData.get(newNoteIndex).setNoteID(oldNoteId);
//
//                temporaryNoteData.sort((x,y) -> x.getNoteID() - y.getNoteID());
//            }
//        }
    }
}
