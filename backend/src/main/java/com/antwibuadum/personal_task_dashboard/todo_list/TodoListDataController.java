package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.POST,RequestMethod.PUT,RequestMethod.GET,})
public class TodoListDataController {
    ArrayList<Todo> emptyList = new ArrayList<>();

    ArrayList<TodoList> temporaryTodoListData = new ArrayList<>();
    {
        temporaryTodoListData.add(new TodoList(0, "My Day", emptyList));
    }

    @GetMapping
    @RequestMapping("/get-todo-list-data")
    public ArrayList<TodoList> getTodoLists() {
        System.out.println("Got Todo List Data");
        return temporaryTodoListData;
    }




}
