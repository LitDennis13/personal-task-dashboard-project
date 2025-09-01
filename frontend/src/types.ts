interface TodoType {
    todoID: number;
    name: string;
    note: string;
    hasNote: boolean;
    isComplete: boolean;
}

interface TodoListType {
    listID: number;
    name: string;
    list: TodoType[];
}

interface NoteType {
    noteID: number;
    note: string;
}

export type {TodoType, TodoListType, NoteType};