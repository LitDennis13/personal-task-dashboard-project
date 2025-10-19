package com.antwibuadum.personal_task_dashboard.todo_list;

import com.antwibuadum.personal_task_dashboard.new_id.NewIDService;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
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
        Todo defaultTodo = new Todo(0, "Example Todo", "", false, false, 0);
        this.todoListRepository.save(defaultList);
        this.todoRepository.save(defaultTodo);
    }

    public List<TodoList> getTodoLists() {
        List<TodoList> todoListInfoData = this.todoListRepository.findAll();
        List<TodoList> allTodoData = new ArrayList<TodoList>();
        for (int i = 0; i < todoListInfoData.size(); i++) {
            TodoList currentList = todoListInfoData.get(i);

            List<Todo> todoListTodos = this.todoRepository.findByAssociatedListIdentifier(currentList.getListIdentifier());


            allTodoData.add(new TodoList(currentList.getListID(), currentList.getName(), new ArrayList<Todo>(todoListTodos), currentList.getListIdentifier()));

        }



        return allTodoData;
    }


}
