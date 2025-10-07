package com.antwibuadum.personal_task_dashboard.new_id;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewIDService {
    private NewIDRepository newIDRepository;

    public NewIDService(NewIDRepository newIDRepository) {
        this.newIDRepository = newIDRepository;
    }

    public NewID getCurrentNewID() {
        Optional<NewID> value = newIDRepository.findById(0);
        if (value.isPresent()) {
            return value.get();
        }
        else {
            return new NewID(-1);
        }
    }
}
