package com.antwibuadum.personal_task_dashboard.new_id;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewIDService {
    private final NewIDRepository newIDRepository;

    private NewID newIDValue;

    public NewIDService(NewIDRepository newIDRepository) {
        this.newIDRepository = newIDRepository;

        Optional<NewID> value = this.newIDRepository.findById(0);
        if (!value.isPresent()) {
            NewID newID = new NewID(100);
            this.newIDRepository.save(newID);
            value = this.newIDRepository.findById(0);
        }

        newIDValue = value.get();
    }

    public NewID getNewID() {
        return newIDValue;
    }

    public void incrementID() {
        Optional<NewID> value = this.newIDRepository.findById(0);
        if (value.isPresent()) {
            value.get().setNewID(value.get().getNewID() + 1);
            this.newIDRepository.save(value.get());
        }
    }
}
