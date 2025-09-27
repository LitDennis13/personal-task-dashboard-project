package com.antwibuadum.personal_task_dashboard.new_id;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/new-id")
@CrossOrigin(origins = "http://localhost:5173")
public class NewIDController {
    private Integer NewID = 1;

    @GetMapping
    @RequestMapping("/get-new-id")
    public Integer getNewID() {
        return NewID;
    }

    @PostMapping
    @RequestMapping("/get-and-increment-new-id")
    public void IncrementID() {
        NewID++;
    }
}
