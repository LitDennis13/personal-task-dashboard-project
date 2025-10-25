package com.antwibuadum.personal_task_dashboard.todo_list;

import com.antwibuadum.personal_task_dashboard.new_id.NewIDService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final NewIDService newIDService;

    public TodoService(TodoRepository todoRepository, NewIDService newIDService) {
        this.todoRepository = todoRepository;
        this.newIDService = newIDService;
    }

    public void addTodo(Todo newTodo) {
        Integer newIDValue = this.newIDService.getNewID();
        newTodo.setTodoID(newIDValue);

        this.newIDService.incrementID();
        this.todoRepository.save(newTodo);
    }

    public void setTodoName(TodoListRequestBodyTypes.SetTodoNameData data) {
        Optional<Todo> valueToUpdate = this.todoRepository.findById(data.todoID);

        if (valueToUpdate.isPresent()) {
            valueToUpdate.get().setName(data.newTodoName);

            this.todoRepository.save(valueToUpdate.get());
        }
    }

    public void setTodoNote(TodoListRequestBodyTypes.SetTodoNoteData data) {
       Optional<Todo> valueToUpdate = this.todoRepository.findById(data.todoID);

        if (valueToUpdate.isPresent()) {
            valueToUpdate.get().setNote(data.newTodoNote);

            valueToUpdate.get().setHasNote(!Objects.equals(data.newTodoNote, ""));

            this.todoRepository.save(valueToUpdate.get());
        }
    }

    public void setTodoCompletionStatus(TodoListRequestBodyTypes.SetTodoCompletionStatusData data) {
        Optional<Todo> valueToUpdate = this.todoRepository.findById(data.todoID);

        if (valueToUpdate.isPresent()) {
            valueToUpdate.get().setIsComplete(data.status);

            this.todoRepository.save(valueToUpdate.get());
        }
    }

    public void deleteTodo(Integer todoID) {
        this.todoRepository.deleteById(todoID);
    }

    public void updateTodoPosition(Integer[][] changeLog) {
        System.out.println(Arrays.deepToString(changeLog));

        for (Integer[] change : changeLog) {
            if (Objects.equals(change[0], change[1])) continue;

            Optional<Todo> todoOne = this.todoRepository.findById(change[0]);
            Optional<Todo> todoTwo = this.todoRepository.findById(change[1]);

            if (todoOne.isPresent() && todoTwo.isPresent()) {
                this.todoRepository.deleteById(change[0]);
                this.todoRepository.deleteById(change[1]);

                todoOne.get().setTodoID(change[1]);
                todoTwo.get().setTodoID(change[0]);

                this.todoRepository.save(todoOne.get());
                this.todoRepository.save(todoTwo.get());
            }
        }
    }
}
