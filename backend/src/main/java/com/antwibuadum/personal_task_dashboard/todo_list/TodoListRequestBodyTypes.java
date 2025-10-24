package com.antwibuadum.personal_task_dashboard.todo_list;

public class TodoListRequestBodyTypes {
    public static class TodoListNameUpdateData {
        public int listID;
        public  String newName;
    }
    public static class SwitchTodoListIDsData {
        public int listIDOne;
        public int listIDTwo;
    }
    public static class SetTodoNameData {
        public int todoID;
        public String newTodoName;
    }
    public static class SetTodoNoteData {
        public int todoID;
        public String newTodoNote;
    }
    public static class SetTodoCompletionStatusData {
        public int todoID;
        public boolean status;
    }
}
