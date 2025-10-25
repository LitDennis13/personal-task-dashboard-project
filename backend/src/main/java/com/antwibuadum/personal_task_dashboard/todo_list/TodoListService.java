package com.antwibuadum.personal_task_dashboard.todo_list;

import com.antwibuadum.personal_task_dashboard.new_id.NewIDService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoListService {
    private final TodoListRepository todoListRepository;
    private final TodoRepository todoRepository;
    private final NewIDService newIDService;

    public TodoListService(TodoListRepository todoListRepository, TodoRepository todoRepository, NewIDService newIDService) {
        this.todoListRepository = todoListRepository;
        this.todoRepository = todoRepository;
        this.newIDService = newIDService;

        if (this.todoListRepository.findById(0).isEmpty()) {
            TodoList defaultList = new TodoList(0, "My Day", new ArrayList<Todo>(), 0);
            this.todoListRepository.save(defaultList);
        }
    }

    public List<TodoList> getTodoLists() {
        List<TodoList> todoListInfoData = this.todoListRepository.findAll();
        List<TodoList> allTodoData = new ArrayList<TodoList>();
        for (TodoList currentList : todoListInfoData) {
            Optional<List<Todo>> todoListTodos = this.todoRepository.findByAssociatedListIdentifier(currentList.getListIdentifier());

            if (todoListTodos.isPresent()) {
                allTodoData.add(new TodoList(currentList.getListID(), currentList.getName(), new ArrayList<Todo>(todoListTodos.get()), currentList.getListIdentifier()));
            }
        }
        return allTodoData;
    }

    public void addTodoList() {
        Integer newIDValue = this.newIDService.getNewID();
        TodoList newTodoList = new TodoList(newIDValue, "", new ArrayList<Todo>(), newIDValue);
        this.newIDService.incrementID();
        this.todoListRepository.save(newTodoList);
    }

    public void setTodoListName(TodoListRequestBodyTypes.TodoListNameUpdateData data) {
        Optional<TodoList> valueToUpdate = this.todoListRepository.findById(data.listID);

        if (valueToUpdate.isPresent()) {
            valueToUpdate.get().setName(data.newName);

            this.todoListRepository.save(valueToUpdate.get());
        }
    }

    public void deleteTodoList(int listID) {
        Optional<TodoList> list = this.todoListRepository.findById(listID);

        if (list.isPresent()) {
            Optional<List<Todo>> associatedTodos = this.todoRepository.findByAssociatedListIdentifier(list.get().getListIdentifier());

            if (associatedTodos.isPresent()) {
                for (Todo todo: associatedTodos.get()) {
                    this.todoRepository.deleteById(todo.getTodoID());
                }
            }

            this.todoListRepository.deleteById(listID);
        }
    }

    public void switchListIDs(TodoListRequestBodyTypes.SwitchTodoListIDsData data) {
        Optional<TodoList> listOne = this.todoListRepository.findById(data.listIDOne);
        Optional<TodoList> listTwo = this.todoListRepository.findById(data.listIDTwo);

        if (listOne.isPresent() && listTwo.isPresent()) {
            this.todoListRepository.deleteById(data.listIDOne);
            this.todoListRepository.deleteById(data.listIDTwo);

            listOne.get().setListID(data.listIDTwo);
            listTwo.get().setListID(data.listIDOne);

            this.todoListRepository.save(listOne.get());
            this.todoListRepository.save(listTwo.get());
        }
    }
}
