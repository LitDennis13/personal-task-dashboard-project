package com.antwibuadum.personal_task_dashboard.todo_list;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Todo {
    @Id
    private Integer todoID;
    private String name;
    private String note;
    private Boolean hasNote;
    private Boolean isComplete;
    private Integer associatedListIdentifier;

    public Todo() {
    }

    public Todo(Integer todoID, String name, String note, Boolean hasNote, Boolean isComplete, Integer associatedListIdentifier) {
        this.todoID = todoID;
        this.name = name;
        this.note = note;
        this.hasNote = hasNote;
        this.isComplete = isComplete;
        this.associatedListIdentifier = associatedListIdentifier;
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

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public Integer getAssociatedListIdentifier() {
        return associatedListIdentifier;
    }

    public void setAssociatedListIdentifier(Integer associatedListIdentifier) {
        this.associatedListIdentifier = associatedListIdentifier;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return Objects.equals(todoID, todo.todoID) && Objects.equals(name, todo.name) && Objects.equals(note, todo.note) && Objects.equals(hasNote, todo.hasNote) && Objects.equals(isComplete, todo.isComplete) && Objects.equals(associatedListIdentifier, todo.associatedListIdentifier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(todoID, name, note, hasNote, isComplete, associatedListIdentifier);
    }
}