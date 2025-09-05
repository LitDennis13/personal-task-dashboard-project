import { create } from "zustand";

import { emptyOrWhiteSpace } from "./components/App/App";

import type { TodoListType, TodoType, NoteType } from "./types";

let defaultTodoListData: TodoListType = {
    listID: 0,
    name: "My Day",
    list: [],
};

type TodoListDataStore = {
    value: TodoListType[];
    setTodoListData: (newTodoListData: TodoListType[]) => void;
    addTodolist: (newListID: number) => void;
    setTodoListName: (listIndex: number, newName: string) => void;
    deleteTodoList: (listIndex: number) => void;
    switchListIDs: (listIndexOne: number, listIndexTwo: number) => void;
};

// SHOULD BE SERVER SIDE STATE
export const TodoListDataStore = create<TodoListDataStore>((set) => ({
    value: [defaultTodoListData],
    setTodoListData: (newTodoListData) => {
        set({value: newTodoListData});
    },
    addTodolist: (newListID) => {
        set((state) => ({value: [...state.value, {listID: newListID, name: "", list: []}]}));
    },
    setTodoListName: (listIndex, newName) => {
        set((state) => {
            state.value[listIndex].name = newName;
            return {value: [...state.value]};
        });
        console.log("was run");
    },
    deleteTodoList: (listIndex) => {
        set((state) => {
            state.value.splice(listIndex, 1);
            return {value: [...state.value]};
        });
    },
    switchListIDs: (listIndexOne, listIndexTwo) => {
        set((state) => {
            let tempID = state.value[listIndexOne].listID;
            state.value[listIndexOne].listID = state.value[listIndexTwo].listID;
            state.value[listIndexTwo].listID = tempID;

            state.value.sort((x, y) => x.listID - y.listID);

            return {value: [...state.value]};
        });
    }
}));


type SelectedTodoListStore = {
    value: TodoListType;
    setSelectedTodoList: (newTodoList: TodoListType) => void;
};

export const useSelectedTodoListStore = create<SelectedTodoListStore>((set) => ({
    value: defaultTodoListData,
    setSelectedTodoList: (newTodoList) => {
        set({value: newTodoList});
    }
}));

type LoadedTodoListStore = {
    value: TodoListType;
    setLoadedTodoList: (otherTodoList: TodoListType) => void;
    setListName: (newName: string) => void;

    addTodo: (newTodo: TodoType) => void;
    setTodoName: (todoIndex: number, newName: string) => void;
    setTodoNote: (todoIndex: number, newNote: string) => void;
    setTodoCompletionStatus: (todoIndex: number, status: boolean) => void;
    deleteTodo: (todoIndex: number) => void;
    updateTodoPosition: (oldID: number, oldIndex: number, newID: number, newIndex: number) => void;
};

export const useLoadedTodoListStore = create<LoadedTodoListStore>((set) => ({
    value: defaultTodoListData,
    setLoadedTodoList: (otherTodoList) => {
        set({value: otherTodoList});
    },
    setListName: (newName) => {
        set((state) => {
            if (state.value !== null) {
                state.value.name = newName;
            }
            return {value: state.value};

        });
    },
    addTodo: (newTodo) => {
        set((state) => {
            if (state.value !== null) {
                state.value.list.push(newTodo);
            }
            return {value: state.value};
        });
    },
    setTodoName: (todoIndex, newName) => {
        set((state) => {
            if (state.value !== null) {
                state.value.list[todoIndex].name = newName;
            }
            return {value: state.value};
        });
    },
    setTodoNote: (todoIndex, newNote) => {
        set((state) => {
            if (state.value !== null) {
                let hasNote = false;
                if (!emptyOrWhiteSpace(newNote)) hasNote = true;

                state.value.list[todoIndex].note = newNote;
                state.value.list[todoIndex].hasNote = hasNote;
            }
            
            return {value: state.value};
        });
    },
    setTodoCompletionStatus: (todoIndex, status) => {
        set((state) => {
            if (state.value !== null) {
                state.value.list[todoIndex].isComplete = status;
            }
            return {value: state.value};
        });
    },
    deleteTodo: (todoIndex) => {
        set((state) => {
            if (state.value !== null) {
                state.value.list.splice(todoIndex, 1);
            }
            return {value: state.value};
        });
    },
    updateTodoPosition: (oldID, oldIndex, newID, newIndex) => {
        set((state) => {
            if (state.value !== null) {
                state.value.list[oldIndex].todoID = newID;
                state.value.list[newIndex].todoID = oldID;

                state.value.list.sort((x, y) => x.todoID - y.todoID);
            }
            return {value: state.value};
        });
    }
}));


type SelectedTodoIDStore = {
    value: number;
    setSelectedTodoID: (newValue: number) => void;
};

export const useSelectedTodoIDStore = create<SelectedTodoIDStore>((set) => ({
    value: -1,
    setSelectedTodoID: (newValue) => {
        set({value: newValue});
    }
}));


// SHOULD BE SERVER SIDE STATE
type NotesDataStore = {
    value: NoteType[];
    setNotesData: (newNotesData: NoteType[]) => void;
    addNewNote: (newNoteID: number) => void;
    updateNote: (noteID: number, newNote: string) => void;
    deleteNote: (noteIndex: number) => void;
    updateNotePosition: (oldID: number, oldIndex: number, newID: number, newIndex: number) => void;
};

export const useNotesDataStore = create<NotesDataStore>((set) => ({
    value: [],
    setNotesData: (newNotesData) => {
        set({value: newNotesData});
    },
    addNewNote: (newNoteID) => {
        let tempNote: NoteType = {noteID: newNoteID, note: ""};
        set((state) => ({value: [...state.value, tempNote]}));
    },
    updateNote: (noteID, newNote) => {
        set((state) => {
            state.value[noteID].note = newNote;
            return {value: [...state.value]};
        });
    },
    deleteNote: (noteIndex) => {
        set((state) => {
            state.value.splice(noteIndex, 1);
            return {value: [...state.value]};
        });
    },
    updateNotePosition: (oldID, oldIndex, newID, newIndex) => {
        set((state) => {
            state.value[newIndex].noteID = oldID;
            state.value[oldIndex].noteID = newID;

            state.value.sort((x, y) => x.noteID - y.noteID);

            return {value: [...state.value]};
        });
    }
}));


type SelectedNoteIndexStore = {
    value: number;
    setSelectedTodoID: (newValue: number) => void;
};

export const useSelectedNoteIndexStore = create<SelectedNoteIndexStore>((set) => ({
    value: -1,
    setSelectedTodoID: (newValue) => {
        set({value: newValue});
    }
}));
