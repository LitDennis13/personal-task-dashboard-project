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
    public void addTodo(@RequestBody Todo newTodo) {
        this.todoService.addTodo(newTodo);
    }



    @PutMapping
    @RequestMapping("/set-todo-name")
    public void setTodoName(@RequestBody TodoListRequestBodyTypes.SetTodoNameData data) {
        this.todoService.setTodoName(data);
    }



    @PutMapping
    @RequestMapping("/set-todo-note")
    public void setTodoNote(@RequestBody TodoListRequestBodyTypes.SetTodoNoteData data) {
        this.todoService.setTodoNote(data);
    }



    @PutMapping
    @RequestMapping("/set-todo-completion-status")
    public void setTodoCompletionStatus(@RequestBody TodoListRequestBodyTypes.SetTodoCompletionStatusData data) {
        this.todoService.setTodoCompletionStatus(data);
    }



    @PutMapping
    @RequestMapping("/delete-todo")
    public void deleteTodo(@RequestBody Integer todoID) {
        this.todoService.deleteTodo(todoID);
    }



    @PutMapping
    @RequestMapping("/update-todo-positions")
    public void updateTodoPosition(@RequestBody Integer[][] changeLog) {
        this.todoService.updateTodoPosition(changeLog);
    }
}


