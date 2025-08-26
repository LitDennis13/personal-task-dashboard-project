import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./page_layout.module.css";

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

function setDocumentTitle(title: string) {
    document.title = title;
}

function App() {
    const APP_NAME = "Personal Task Dashboard";

    // Pomodoro Timer stuff
    let [timerHasStarted, setTimerHasStarted] = useState(false);
    let [option, timerStarted, timeRemaining, optionSet, setTimerStarted, setPlayedTimerEndSFX] = useTimer(APP_NAME, setDocumentTitle, 0);

    // Todo List stuff
    let defaultTodoListData: TodoListType = {
        listID: 0,
        name: "My Day",
        list: [],
    };
    let [newID, setNewID] = useState(1);
    let [todoListData, setTodoListData] = useState([defaultTodoListData]);
    let [selectedTodoList, setSelectedTodoList] = useState<TodoListType>(todoListData[0]);
    let [selectedTodoID, setSelectedTodoID] = useState(-1);



    // Notes Stuff
    let [notesData, setNotesData] = useState<NoteType[]>([]);
    let [changeBackgroundColor, setChangeBackGroundColor] = useState(false);
    let [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
    let location = useLocation();



    useEffect(() => {
        if (location.pathname === "/pomodoro-timer" || location.pathname === "/todo-list") {
            setChangeBackGroundColor(false);
        }
        else {
            setChangeBackGroundColor(true);
        }
    }, [location]);

    return <div id={changeBackgroundColor ? styles.changeBackgroundColor : ""}className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet context={
                [APP_NAME, [option, timerStarted, timeRemaining, optionSet, setTimerStarted, setPlayedTimerEndSFX], [timerHasStarted, setTimerHasStarted],
                setDocumentTitle, [todoListData, setTodoListData], [newID, setNewID], [notesData, setNotesData], [selectedTodoList, setSelectedTodoList],
                [selectedTodoID, setSelectedTodoID], [selectedNoteIndex, setSelectedNoteIndex]]
            }/>
        </div>
    </div>
}

export default App;

export type {TodoType, TodoListType, NoteType};