package com.antwibuadum.personal_task_dashboard.new_id;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/new-id")
@CrossOrigin(origins = "http://localhost:5173")
public class NewIDController {
    private Integer NewID = 1;

    @GetMapping
    @RequestMapping("/get-new-id")
    public Integer getNewID() {
        System.out.println("New ID is " + NewID);
        return NewID;
    }

    @GetMapping
    @RequestMapping("/get-and-increment-new-id")
    public Integer IncrementID() {
        NewID++;
        System.out.println("New ID is " + NewID);
        return NewID;
    }
}
