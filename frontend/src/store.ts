import { create } from "zustand";

import { emptyOrWhiteSpace } from "./components/App/App";

import type { TodoListType, TodoType, NoteType } from "./types";


let defaultTodoListData: TodoListType = {
    listID: 0,
    name: "My Day",
    list: [],
    listIdentifier: 0,
};

type SelectedTodoListData = {
    value: {
        data: TodoListType;
        setTodoListName: (newName: string) => void;
        updateSelectedTodoListData: (updatedData: TodoListType) => void;
        setTodoName: (todoIndex: number, newName: string) => void;
        setTodoNote: (todoIndex: number, newNote: string) => void;
        updateTodoPosition: (oldID: number, oldIndex: number, newID: number, newIndex: number) => void;
    };
};

export const SelectedTodoListDataStore = create<SelectedTodoListData>((set) => ({
    value: {
        data: defaultTodoListData,
        updateSelectedTodoListData: (updatedData) => {
            set((state) => {
                state.value.data = updatedData;

                return {value: {...state.value}};
            });
        },
        setTodoListName: (newName) => {
            set((state) => {
                state.value.data.name = newName;

                return {value: {...state.value}};
            });
        },
        setTodoName: (todoIndex, newName) => {
            set((state) => {
                state.value.data.list[todoIndex].name = newName;
                return {value: {...state.value}};
            });
        },
        setTodoNote: (todoIndex, newNote) => {
            set((state) => {
                let hasNote = false;
                if (!emptyOrWhiteSpace(newNote)) hasNote = true;


                state.value.data.list[todoIndex].note = newNote;
                state.value.data.list[todoIndex].hasNote = hasNote;
                return {value: {...state.value}};
            });
        },
        updateTodoPosition: (oldID, oldIndex, newID, newIndex) => {
            set((state) => {
                state.value.data.list[oldIndex].todoID = newID;
                state.value.data.list[newIndex].todoID = oldID;

                state.value.data.list.sort((x, y) => x.todoID - y.todoID);

                return {value: {...state.value}};
            });
        }
}
}));




type SelectedTodoListIDStore = {
    value: number;
    setSelectedTodoListID: (newTodoListID: number) => void;
};

export const useSelectedTodoListIDStore = create<SelectedTodoListIDStore>((set) => ({
    value: 0,
    setSelectedTodoListID: (newTodoListID) => {
        set({value: newTodoListID});
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
type LocalNotesDataStore = {
    value: {
        data: NoteType[];
        setNotesData: (newNotesData: NoteType[]) => void;
        updateNotePosition: (oldID: number, oldIndex: number, newID: number, newIndex: number) => void;
    }
    
};

export const useLocalNotesDataStore = create<LocalNotesDataStore>((set) => ({
    value: {
        data: [],
        setNotesData: (newNotesData) => {
                set((state) => {
                    state.value.data = newNotesData;
                    return {value: {...state.value}};
                });
            },
            updateNotePosition: (oldID, oldIndex, newID, newIndex) => {
                set((state) => {
                    state.value.data[newIndex].noteID = oldID;
                    state.value.data[oldIndex].noteID = newID;

                    state.value.data.sort((x, y) => x.noteID - y.noteID);

                    return {value: {...state.value}};
                });
            }
        },
}));

type SelectedNoteStore = {
    value: {
        data: NoteType;
        setSelectedNoteID: (newData: NoteType) => void;
    },
};

export const useSelectedNoteStore = create<SelectedNoteStore>((set) => ({
    value: {
        data: {noteID: -1, note: ""},
        setSelectedNoteID: (newData) => {
            set((state) => {
                state.value.data = newData;
                return {value: {...state.value}};
            });
        }
    }
}));


type SelectedNoteIDStore = {
    value: {
        data: number;
        setSelectedNoteID: (newValue: number) => void;
    },
};

export const useSelectedNoteIDStore = create<SelectedNoteIDStore>((set) => ({
    value: {
        data: -1,
        setSelectedNoteID: (newValue) => {
            set((state) => {
                state.value.data = newValue;
                return {value: {...state.value}};
            });
        }
    }
}));
