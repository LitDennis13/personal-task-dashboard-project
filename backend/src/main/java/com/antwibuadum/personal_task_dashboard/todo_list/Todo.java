package com.antwibuadum.personal_task_dashboard.todo_list;

import java.util.Objects;

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

    public Integer getTodoID() {
        return todoID;
    }

    public void setTodoID(Integer todoID) {
        this.todoID = todoID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean getHasNote() {
        return hasNote;
    }

    public void setHasNote(Boolean hasNote) {
        this.hasNote = hasNote;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return Objects.equals(todoID, todo.todoID) && Objects.equals(name, todo.name) && Objects.equals(note, todo.note) && Objects.equals(hasNote, todo.hasNote) && Objects.equals(isComplete, todo.isComplete);
    }

    @Override
    public int hashCode() {
        return Objects.hash(todoID, name, note, hasNote, isComplete);
    }
}