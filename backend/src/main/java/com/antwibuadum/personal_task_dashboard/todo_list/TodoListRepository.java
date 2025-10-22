package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TodoListRepository extends JpaRepository<TodoList, Integer> {
    Optional<TodoList> findByListID(Integer listID);
}
