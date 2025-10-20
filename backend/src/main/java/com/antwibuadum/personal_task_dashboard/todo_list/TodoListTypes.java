package com.antwibuadum.personal_task_dashboard.todo_list;

public class TodoListTypes {
    public static class TodoListNameUpdateData {
        public int listID;
        public  String newName;
    }
    public static class SwitchTodoListIDsData {
        public int listIDOne;
        public int listIDTwo;
    }
}
