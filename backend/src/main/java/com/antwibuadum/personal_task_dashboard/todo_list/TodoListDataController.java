package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.POST,RequestMethod.PUT,RequestMethod.GET,})
public class TodoListDataController {
    ArrayList<TodoList> temporaryTodoListData = new ArrayList<>();
    {
        temporaryTodoListData.add(new TodoList(0, "My Day", new ArrayList<Todo>()));
    }

    @GetMapping
    @RequestMapping("/get-todo-list-data")
    public ArrayList<TodoList> getTodoLists() {
//        System.out.println("Got Todo List Data");
        return temporaryTodoListData;
    }


    @PutMapping
    @RequestMapping("/add-todo-list")
    public void addTodoList(@RequestBody Integer listID) {
        temporaryTodoListData.add(new TodoList(listID, "", new ArrayList<Todo>()));

        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            System.out.println(temporaryTodoListData.get(i).getName());
        }
        System.out.println("Added New Todo List");
    }


    public static class TodoListNameUpdateData {
        public int listID;
        public  String newName;
    }
    @PutMapping
    @RequestMapping("/set-todo-list-name")
    public void setTodoListName(@RequestBody TodoListNameUpdateData data) {
        for (TodoList temporaryTodoListDatum : temporaryTodoListData) {
            if (Objects.equals(temporaryTodoListDatum.getListID(), data.listID)) {
                temporaryTodoListDatum.setName(data.newName);
                break;
            }
        }
    }


    @PutMapping
    @RequestMapping("/delete-todo-list")
    public void deleteTodoList(@RequestBody int listID) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (Objects.equals(temporaryTodoListData.get(i).getListID(), listID)) {
                temporaryTodoListData.remove(i);
                break;
            }
        }
    }

    public static class SwitchTodoListIDsData {
        public int listIDOne;
        public int listIDTwo;
    }

    @PutMapping
    @RequestMapping("/switch-todo-list-ids")
    public void switchListIDs(@RequestBody SwitchTodoListIDsData data) {
        int listOneIndex = -1;
        int listTwoIndex = -1;

        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (Objects.equals(temporaryTodoListData.get(i).getListID(), data.listIDOne)) {
                listOneIndex = i;
            }
            else if (Objects.equals(temporaryTodoListData.get(i).getListID(), data.listIDTwo)) {
                listTwoIndex = i;
            }
        }

        temporaryTodoListData.get(listOneIndex).setListID(data.listIDTwo);
        temporaryTodoListData.get(listTwoIndex).setListID(data.listIDOne);

        temporaryTodoListData.sort((x,y) -> x.getListID() - y.getListID());
    }
}


