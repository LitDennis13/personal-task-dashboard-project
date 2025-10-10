package com.antwibuadum.personal_task_dashboard.new_id;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewIDService {
    private final NewIDRepository newIDRepository;
    

    public NewIDService(NewIDRepository newIDRepository) {
        this.newIDRepository = newIDRepository;

        
    }

    public Integer getNewID() {
        Integer newIDValue = -1;
        Optional<NewID> value = this.newIDRepository.findById(0);
        if (!value.isPresent()) {
            NewID newID = new NewID(1);
            this.newIDRepository.save(newID);
            value = this.newIDRepository.findById(0);
        }

        if (value.isPresent()) newIDValue = value.get().getNewID();
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
