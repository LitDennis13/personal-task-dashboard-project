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
    setSelectedTodoID: (newNotesData: NoteType[]) => void;
};

export const useNotesDataStore = create<NotesDataStore>((set) => ({
    value: [],
    setSelectedTodoID: (newNotesData) => {
        set({value: newNotesData});
    }
}));


//        let [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
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
