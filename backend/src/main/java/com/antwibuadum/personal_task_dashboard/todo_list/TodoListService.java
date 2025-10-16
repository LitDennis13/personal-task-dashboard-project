package com.antwibuadum.personal_task_dashboard.todo_list;

import com.antwibuadum.personal_task_dashboard.new_id.NewIDService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoListService {
    private final TodoListRepository todoListRepository;
    private final TodoRepository todoRepository;
    private final NewIDService newIDService;

    public TodoListService(TodoListRepository todoListRepository, TodoRepository todoRepository, NewIDService newIDService) {
        this.todoListRepository = todoListRepository;
        this.todoRepository = todoRepository;
        this.newIDService = newIDService;

        TodoList defaultList = new TodoList(0, "My Day", new ArrayList<Todo>(), 0);
        this.todoListRepository.save(defaultList);
    }

    public List<TodoList> getTodoLists() {
        return this.todoListRepository.findAll();
    }


}
