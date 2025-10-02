package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "*", methods = {RequestMethod.PUT,RequestMethod.GET})
public class TodoListDataController {
    ArrayList<TodoList> temporaryTodoListData = new ArrayList<>();
    {
        temporaryTodoListData.add(new TodoList(0, "My Day", new ArrayList<Todo>()));
    }

    @GetMapping
    @RequestMapping("/get-todo-list-data")
    public ArrayList<TodoList> getTodoLists() {
        return temporaryTodoListData;
    }


    @PutMapping
    @RequestMapping("/add-todo-list")
    public void addTodoList(@RequestBody Integer listID) {
        temporaryTodoListData.add(new TodoList(listID, "", new ArrayList<Todo>()));
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


    public static class AddTodoData {
        public int listID;
        public Todo newTodo;
    }
    @PutMapping
    @RequestMapping("/add-todo")
    public void addTodo(@RequestBody AddTodoData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                temporaryTodoListData.get(i).getList().add(data.newTodo);
                break;
            }
        }
    }


    public static class SetTodoNameData {
        public int listID;
        public int todoID;
        public String newTodoName;
    }
    @PutMapping
    @RequestMapping("/set-todo-name")
    public void setTodoName(@RequestBody SetTodoNameData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                for (int j = 0; j < temporaryTodoListData.get(i).getList().size(); j++) {
                    if (temporaryTodoListData.get(i).getList().get(j).getTodoID() == data.todoID) {
                        temporaryTodoListData.get(i).getList().get(j).setName(data.newTodoName);
                        break;
                    }
                }
                break;
            }
        }
    }


    public static class SetTodoNoteData {
        public int listID;
        public int todoID;
        public String newTodoNote;
    }
    @PutMapping
    @RequestMapping("/set-todo-note")
    public void setTodoNote(@RequestBody SetTodoNoteData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                for (int j = 0; j < temporaryTodoListData.get(i).getList().size(); j++) {
                    if (temporaryTodoListData.get(i).getList().get(j).getTodoID() == data.todoID) {
                        if (Objects.equals(data.newTodoNote, "")) {
                            temporaryTodoListData.get(i).getList().get(j).setHasNote(false);
                        }
                        else {
                            temporaryTodoListData.get(i).getList().get(j).setHasNote(true);
                        }
                        temporaryTodoListData.get(i).getList().get(j).setNote(data.newTodoNote);
                        break;
                    }
                }
                break;
            }
        }
    }


    public static class SetTodoCompletionStatusData {
        public int listID;
        public int todoID;
        public boolean status;
    }
    @PutMapping
    @RequestMapping("/set-todo-completion-status")
    public void setTodoCompletionStatus(@RequestBody SetTodoCompletionStatusData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                for (int j = 0; j < temporaryTodoListData.get(i).getList().size(); j++) {
                    if (temporaryTodoListData.get(i).getList().get(j).getTodoID() == data.todoID) {
                        temporaryTodoListData.get(i).getList().get(j).setIsComplete(data.status);
                        break;
                    }
                }
                break;
            }
        }
    }


    public static class DeleteTodoData {
        public int listID;
        public int todoID;
    }
    @PutMapping
    @RequestMapping("/delete-todo")
    public void deleteTodo(@RequestBody DeleteTodoData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                for (int j = 0; j < temporaryTodoListData.get(i).getList().size(); j++) {
                    if (temporaryTodoListData.get(i).getList().get(j).getTodoID() == data.todoID) {
                        temporaryTodoListData.get(i).getList().remove(j);
                        break;
                    }
                }
                break;
            }
        }
    }


    public static class UpdateTodoPositionsData {
        public int listID;
        public Integer[][] changeLog;
    }
    @PutMapping
    @RequestMapping("/update-todo-positions")
    public void updateTodoPosition(@RequestBody UpdateTodoPositionsData data) {
        int listIndex = -1;
        int oldTodoIndex = -1;
        int newTodoIndex = -1;
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                listIndex = i;
                break;
            }
        }

        for (int i = 0; i < data.changeLog.length; i++) {
            if (!Objects.equals(data.changeLog[i][0], data.changeLog[i][1])) {
                int oldTodoId = data.changeLog[i][0];
                int newTodoId = data.changeLog[i][1];

                for (int j = 0; j < temporaryTodoListData.get(listIndex).getList().size(); j++) {
                    if (Objects.equals(temporaryTodoListData.get(listIndex).getList().get(j).getTodoID(), oldTodoId)) {
                        oldTodoIndex = j;
                    }
                    if (Objects.equals(temporaryTodoListData.get(listIndex).getList().get(j).getTodoID(), newTodoId)) {
                        newTodoIndex = j;
                    }
                }

                temporaryTodoListData.get(listIndex).getList().get(oldTodoIndex).setTodoID(newTodoId);
                temporaryTodoListData.get(listIndex).getList().get(newTodoIndex).setTodoID(oldTodoId);

                temporaryTodoListData.get(listIndex).getList().sort((x,y) -> x.getTodoID() - y.getTodoID());
            }
        }
    }
}


