package com.antwibuadum.personal_task_dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PersonalTaskDashboardProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(PersonalTaskDashboardProjectApplication.class, args);
    }

    @GetMapping
    public String helloWorld() {
        return "Hello, World!";
    }

}
