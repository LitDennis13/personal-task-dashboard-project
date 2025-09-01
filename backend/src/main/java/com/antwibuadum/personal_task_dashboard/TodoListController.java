package com.antwibuadum.personal_task_dashboard;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/todo-lists")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoListController {
    Todo[] emptyList = {};

    @GetMapping
    @RequestMapping("/getTodoLists")
    public List<TodoList> getTodoLists() {
        return List.of(
                new TodoList(5, "Example Todo List One", emptyList),
                new TodoList(9, "Example Todo List Two", emptyList)
        );
    }

    @RequestMapping("/getTest")
    @GetMapping
    public String todoListsTest() {
        return "Hello, World From Todo Lists";
    }
}
