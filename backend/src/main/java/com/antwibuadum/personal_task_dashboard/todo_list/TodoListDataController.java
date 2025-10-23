package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "*", methods = {RequestMethod.PUT,RequestMethod.GET})
public class TodoListDataController {
    ArrayList<TodoList> temporaryTodoListData = new ArrayList<>();

    TodoListService todoListService;
    TodoService todoService;

    public TodoListDataController(TodoListService todoListService, TodoService todoService) {
        this.todoListService = todoListService;
        this.todoService = todoService;
    }

    @GetMapping
    @RequestMapping("/get-todo-list-data")
    public List<TodoList> getTodoLists() {
        return this.todoListService.getTodoLists();
    }


    @PutMapping
    @RequestMapping("/add-todo-list")
    public void addTodoList(Integer listID) {
        this.todoListService.addTodoList();
    }



    @PutMapping
    @RequestMapping("/set-todo-list-name")
    public void setTodoListName(@RequestBody TodoListRequestBodyTypes.TodoListNameUpdateData data) {
        this.todoListService.setTodoListName(data);
    }


    @PutMapping
    @RequestMapping("/delete-todo-list")
    public void deleteTodoList(@RequestBody int listID) {
        this.todoListService.deleteTodoList(listID);
    }


    @PutMapping
    @RequestMapping("/switch-todo-list-ids")
    public void switchListIDs(@RequestBody TodoListRequestBodyTypes.SwitchTodoListIDsData data) {
        this.todoListService.switchListIDs(data);
    }



    @PutMapping
    @RequestMapping("/add-todo")
    public void addTodo(@RequestBody TodoListRequestBodyTypes.AddTodoData data) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (temporaryTodoListData.get(i).getListID() == data.listID) {
                temporaryTodoListData.get(i).getList().add(data.newTodo);
                break;
            }
        }
    }



    @PutMapping
    @RequestMapping("/set-todo-name")
    public void setTodoName(@RequestBody TodoListRequestBodyTypes.SetTodoNameData data) {
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



    @PutMapping
    @RequestMapping("/set-todo-note")
    public void setTodoNote(@RequestBody TodoListRequestBodyTypes.SetTodoNoteData data) {
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



    @PutMapping
    @RequestMapping("/set-todo-completion-status")
    public void setTodoCompletionStatus(@RequestBody TodoListRequestBodyTypes.SetTodoCompletionStatusData data) {
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



    @PutMapping
    @RequestMapping("/delete-todo")
    public void deleteTodo(@RequestBody TodoListRequestBodyTypes.DeleteTodoData data) {
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



    @PutMapping
    @RequestMapping("/update-todo-positions")
    public void updateTodoPosition(@RequestBody TodoListRequestBodyTypes.UpdateTodoPositionsData data) {
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


