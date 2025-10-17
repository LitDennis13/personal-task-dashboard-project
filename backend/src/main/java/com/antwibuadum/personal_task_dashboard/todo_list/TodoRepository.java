package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByAssociatedListIdentifier(Integer associatedListIdentifier);
}
