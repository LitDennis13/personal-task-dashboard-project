package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoListRepository extends JpaRepository<TodoList, Integer> {
}
