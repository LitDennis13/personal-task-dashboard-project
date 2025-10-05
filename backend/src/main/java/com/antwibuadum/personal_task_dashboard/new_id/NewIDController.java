package com.antwibuadum.personal_task_dashboard.new_id;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/new-id")
@CrossOrigin(origins = "*")
public class NewIDController {
    private NewID newID = new NewID(1);

    @GetMapping
    @RequestMapping("/get-new-id")
    public Integer getNewID() {
        return newID.getNewID();
    }

    @PostMapping
    @RequestMapping("/get-and-increment-new-id")
    public void IncrementID() {
        newID.setNewID(newID.getNewID() + 1);
    }
}
