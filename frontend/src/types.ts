interface TodoType {
    todoID: number;
    name: string;
    note: string;
    hasNote: boolean;
    isComplete: boolean;
    associatedListIdentifier: number;
};

interface TodoListType {
    listID: number;
    name: string;
    list: TodoType[];
    listIdentifier: number;
};

interface NoteType {
    noteID: number;
    note: string;
};

export type {TodoType, TodoListType, NoteType};