package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    Optional<List<Todo>> findByAssociatedListIdentifier(Integer associatedListIdentifier);
}
