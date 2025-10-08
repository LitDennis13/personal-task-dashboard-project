package com.antwibuadum.personal_task_dashboard.new_id;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/new-id")
@CrossOrigin(origins = "*")
public class NewIDController {
    private final NewID newID = new NewID(1);

    private final NewIDService newIDService;

    public NewIDController(NewIDService newIDService) {
        this.newIDService = newIDService;
    }

    @GetMapping
    @RequestMapping("/get-new-id")
    public NewID getNewID() {
        return newIDService.getCurrentNewID();
    }

    @PostMapping
    @RequestMapping("/get-and-increment-new-id")
    public void IncrementID() {
        newID.setNewID(newID.getNewID() + 1);
    }
}
