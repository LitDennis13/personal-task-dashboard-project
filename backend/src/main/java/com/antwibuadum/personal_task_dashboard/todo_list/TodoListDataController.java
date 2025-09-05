package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoListDataController {
    List<Todo> emptyList = List.of(
            new Todo(56, "Test Todo One", "", false, false)
    );

    List<TodoList> temporaryTodoListData = List.of(
            new TodoList(0, "My Day", emptyList)
    );


    @GetMapping
    @RequestMapping("/getTodoListData")
    public List<TodoList> getTodoListData() {
        System.out.println("Got Todo List Data");
        return temporaryTodoListData;
    }

    @GetMapping
    @RequestMapping("/updateLoadedTodoList")
    public List<TodoList> updateLoadedTodoList() {

        return temporaryTodoListData;
    }
}
