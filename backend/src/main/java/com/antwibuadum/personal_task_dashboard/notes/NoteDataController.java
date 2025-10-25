package com.antwibuadum.personal_task_dashboard.notes;


import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void addNote() {
        this.noteService.addNote();
    }

    @PutMapping
    @RequestMapping("/delete-note")
    public void deleteNote(@RequestBody int noteID) {
        this.noteService.deleteNote(noteID);
    }

    @PutMapping
    @RequestMapping("/update-note-positions")
    public void updateTodoPosition(@RequestBody Integer[][] changeLog) {
        this.noteService.updateNotePosition(changeLog);
    }
}
