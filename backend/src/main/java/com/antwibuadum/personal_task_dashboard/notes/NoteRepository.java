package com.antwibuadum.personal_task_dashboard.notes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
}
