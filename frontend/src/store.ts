import { create } from "zustand";

import { emptyOrWhiteSpace } from "./components/App/App";

import type { TodoListType, TodoType, NoteType } from "./types";


// fetch("http://localhost:8080/api/v1/todo-list-data/getTodoListData", {
//     method: "GET",
//     mode: 'cors',
//     headers: {
//         'Access-Control-Allow-Origin':'*'
//     }
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error(error);
// });

// fetch("http://localhost:8080/api/v1/new-id/get-and-increment-new-id", {
//     method: "GET",
//     mode: 'cors',
//     headers: {
//         'Access-Control-Allow-Origin':'*'
//     }
// })
// .then((response) => response.json())
// .then((data: number) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error(error);
// });

const fetchOptions: RequestInit = {
    method: "GET",
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
};

type NewIDStore = {
    value: number;
    updateNewID: () => Promise<void>;
    incrementNewID: () => Promise<void>;
};

// SHOULD BE SERVER SIDE STATE
export const useNewIDStore = create<NewIDStore>((set) => ({
    value: 0,
    updateNewID: async () => {
        await fetch("http://localhost:8080/api/v1/new-id/get-new-id", fetchOptions)
        .then((response) => response.json())
        .then((data: number) => {
            set({value: data});
        })
        .catch((error) => {
            console.error(error);
        });
    },

    incrementNewID: async () => {
        await fetch("http://localhost:8080/api/v1/new-id/get-and-increment-new-id", fetchOptions)
        .then((response) => response.json())
        .then((data: number) => {
            set({value: data});
        })
        .catch((error) => {
            console.error(error);
        });
        
    }
}));


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
    addTodo: (listIndex: number, newTodo: TodoType) => void;
    setTodoName: (listIndex: number, todoIndex: number, newName: string) => void;
    setTodoNote: (listIndex: number, todoIndex: number, newNote: string) => void;
    setTodoCompletionStatus: (listIndex: number, todoIndex: number, status: boolean) => void;
    deleteTodo: (listIndex: number, todoIndex: number) => void;
    updateTodoPosition: (listIndex: number, oldID: number, oldIndex: number, newID: number, newIndex: number) => void;
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
    },
    addTodo: (listIndex, newTodo) => {
        set((state) => {
            state.value[listIndex].list.push(newTodo);
            return {value: [...state.value]}
        });
    },
    setTodoName: (listIndex, todoIndex, newName) => {
        set((state) => {
            state.value[listIndex].list[todoIndex].name = newName;
            return {value: [...state.value]};
        });
    },
    setTodoNote: (listIndex, todoIndex, newNote) => {
        set((state) => {
            let hasNote = false;
            if (!emptyOrWhiteSpace(newNote)) hasNote = true;


            state.value[listIndex].list[todoIndex].note = newNote;
            state.value[listIndex].list[todoIndex].hasNote = hasNote;
            return {value: [...state.value]};
        });
    },
    setTodoCompletionStatus: (listIndex, todoIndex, status) => {
        set((state) => {
            state.value[listIndex].list[todoIndex].isComplete = status;
            return {value: [...state.value]};
        });
    },
    deleteTodo: (listIndex, todoIndex) => {
        set((state) => {
            state.value[listIndex].list.splice(todoIndex, 1);

            return {value: [...state.value]};
        });
    },
    updateTodoPosition: (listIndex, oldID, oldIndex, newID, newIndex) => {
        set((state) => {
            state.value[listIndex].list[oldIndex].todoID = newID;
            state.value[listIndex].list[newIndex].todoID = oldID;

            state.value[listIndex].list.sort((x, y) => x.todoID - y.todoID);

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
