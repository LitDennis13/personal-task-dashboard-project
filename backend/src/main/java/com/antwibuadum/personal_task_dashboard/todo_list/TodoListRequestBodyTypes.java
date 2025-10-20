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
    public static class AddTodoData {
        public int listID;
        public Todo newTodo;
    }
    public static class SetTodoNameData {
        public int listID;
        public int todoID;
        public String newTodoName;
    }
    public static class SetTodoNoteData {
        public int listID;
        public int todoID;
        public String newTodoNote;
    }
    public static class SetTodoCompletionStatusData {
        public int listID;
        public int todoID;
        public boolean status;
    }
    public static class DeleteTodoData {
        public int listID;
        public int todoID;
    }
    public static class UpdateTodoPositionsData {
        public int listID;
        public Integer[][] changeLog;
    }
}
