package com.antwibuadum.personal_task_dashboard.notes;

import com.antwibuadum.personal_task_dashboard.new_id.NewIDRepository;
import com.antwibuadum.personal_task_dashboard.new_id.NewIDService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final NewIDService newIDService;
//    private final NewIDRepository newIDRepository;

    public NoteService(NoteRepository noteRepository, NewIDService newIDService) {
        this.noteRepository = noteRepository;
        this.newIDService = newIDService;
    }

    public List<Note> getNoteData() {
        return this.noteRepository.findAll();
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

    public void setNote(NoteTypes.SetNoteData data) {
        Optional<Note> valueToUpdate = this.noteRepository.findById(data.noteID);

        if (valueToUpdate.isPresent()) {
            StringBuilder whiteSpaceRemovedNote = leftRightWhiteSpaceRemoval(data.newNote);
            valueToUpdate.get().setNote(whiteSpaceRemovedNote.toString());
            this.noteRepository.save(valueToUpdate.get());
        }
    }

    public void addNote() {
        Note newNote = new Note(this.newIDService.getNewID(), "");
        this.newIDService.incrementID();
        this.noteRepository.save(newNote);
    }

    public void deleteNote(int noteID) {
        this.noteRepository.deleteById(noteID);
    }

    public void updateNotePosition(Integer[][] changeLog) {
        for (int i = 0; i < changeLog.length; i++) {
            if (!Objects.equals(changeLog[i][0], changeLog[i][1])) {
                int oldNoteId = changeLog[i][0];
                int newNoteId = changeLog[i][1];

                Optional<Note> oldNote = this.noteRepository.findById(oldNoteId);
                Optional<Note> newNote = this.noteRepository.findById(newNoteId);

                if (oldNote.isPresent() && newNote.isPresent()) {
                    this.noteRepository.deleteById(oldNoteId);
                    this.noteRepository.deleteById(newNoteId);

                    oldNote.get().setNoteID(newNoteId);
                    newNote.get().setNoteID(oldNoteId);

                    this.noteRepository.save(oldNote.get());
                    this.noteRepository.save(newNote.get());
                }


//                for (int j = 0; j < allNoteData.size(); j++) {
//                    if (Objects.equals(allNoteData.get(j).getNoteID(), oldNoteId)) {
//                        oldNoteIndex = j;
//                    }
//                    if (Objects.equals(allNoteData.get(j).getNoteID(), newNoteId)) {
//                        newNoteIndex = j;
//                    }
//                }
//
//                temporaryNoteData.get(oldNoteIndex).setNoteID(newNoteId);
//                temporaryNoteData.get(newNoteIndex).setNoteID(oldNoteId);
            }
        }
    }
}
