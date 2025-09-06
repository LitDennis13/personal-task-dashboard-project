package com.antwibuadum.personal_task_dashboard.todo_list;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/todo-list-data")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.PUT})
public class TodoListDataController {
    ArrayList<Todo> emptyList = new ArrayList<>();

//    List<TodoList> temporaryTodoListData = List.of(
//            new TodoList(0, "My Day", emptyList)
//    );

    ArrayList<TodoList> temporaryTodoListData = new ArrayList<>();
    {
        temporaryTodoListData.add(new TodoList(0, "My Day", emptyList));
        System.out.println("Runs");
    }


    @GetMapping
    @RequestMapping("/getTodoListData")
    public List<TodoList> getTodoListData() {

        System.out.println("Got Todo List Data");
        return temporaryTodoListData;
    }

    @PutMapping
    @RequestMapping("/updateLoadedTodoList")
    public List<TodoList> updateLoadedTodoList(@RequestBody TodoList loadedTodoList) {
        for (int i = 0; i < temporaryTodoListData.size(); i++) {
            if (Objects.equals(temporaryTodoListData.get(i).getListID(), loadedTodoList.getListID())) {
                temporaryTodoListData.set(i, loadedTodoList);
                
                for (int j = 0; j < temporaryTodoListData.get(i).getList().size(); j++) {
                    System.out.println(temporaryTodoListData.get(i).getList().get(j).getTodoID() + " " + temporaryTodoListData.get(i).getList().get(j).getName() + " " + temporaryTodoListData.get(i).getList().get(j).getNote() + " " + temporaryTodoListData.get(i).getList().get(j).getHasNote() + " " + temporaryTodoListData.get(i).getList().get(j).getIsComplete());
                }
            }
        }
        return temporaryTodoListData;
    }
}
