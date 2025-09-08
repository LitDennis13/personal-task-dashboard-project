package com.antwibuadum.personal_task_dashboard.todo_list;

import java.util.ArrayList;
import java.util.Objects;

public class TodoList {
    private Integer listID;
    private String name;
    private ArrayList<Todo> list;

    public TodoList() {

    }

    public TodoList(Integer listID, String name, ArrayList<Todo> list) {
        this.listID = listID;
        this.name = name;
        this.list = list;
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TodoList todoList = (TodoList) o;
        return Objects.equals(listID, todoList.listID) && Objects.equals(name, todoList.name) && Objects.equals(list, todoList.list);
    }

    @Override
    public int hashCode() {
        return Objects.hash(listID, name, list);
    }
}
