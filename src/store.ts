import { create } from "zustand";
import type { NoteType, TodoListType } from "./components/App/App";

type TimerHasStartedStore = {
    value: boolean;
    setTimerHasStarted: (status: boolean) => void;
};

export const useTimerHasStartedStore = create<TimerHasStartedStore>((set) => ({
    value: false,
    setTimerHasStarted: (status: boolean) => {
        set({value: status});
    },
}));


type NewIDStore = {
    value: number,
    incrementNewID: () => void;
};

export const useNewIDStore = create<NewIDStore>((set) => ({
    value: 1,
    incrementNewID: () => {
        set((state) => ({value: state.value + 1}));
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
};

export const TodoListDataStore = create<TodoListDataStore>((set) => ({
    value: [defaultTodoListData],
    setTodoListData: (newTodoListData) => {
        set({value: newTodoListData});
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
