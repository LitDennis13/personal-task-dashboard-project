package com.antwibuadum.personal_task_dashboard.todo_list;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.Objects;

@Entity
public class TodoList {
    @Id
    private Integer listID;
    private String name;
    private ArrayList<Todo> list;
    private Integer listIdentifier;

    public TodoList() {

    }

    public TodoList(Integer listID, String name, ArrayList<Todo> list, Integer listIdentifier) {
        this.listID = listID;
        this.name = name;
        this.list = list;
        this.listIdentifier = listIdentifier;
    }

    public Integer getListID() {
        return listID;
    }

    public void setListID(Integer listID) {
        this.listID = listID;
    }

    public ArrayList<Todo> getList() {
        return list;
    }

    public void setList(ArrayList<Todo> list) {
        this.list = list;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getListIdentifier() {
        return listIdentifier;
    }

    public void setListIdentifier(Integer listIdentifier) {
        this.listIdentifier = listIdentifier;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TodoList todoList = (TodoList) o;
        return Objects.equals(listID, todoList.listID) && Objects.equals(name, todoList.name) && Objects.equals(list, todoList.list) && Objects.equals(listIdentifier, todoList.listIdentifier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(listID, name, list, listIdentifier);
    }
}
