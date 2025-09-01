package com.antwibuadum.personal_task_dashboard;

public class Todo {
    Integer todoID;
    String name;
    String note;
    Boolean hasNote;
    Boolean isComplete;

    public Todo() {
    }

    public Todo(Integer todoID, String name, String note, Boolean hasNote, Boolean isComplete) {
        this.todoID = todoID;
        this.name = name;
        this.note = note;
        this.hasNote = hasNote;
        this.isComplete = isComplete;
    }
}