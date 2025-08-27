import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./page_layout.module.css";

export const APP_NAME = "Personal Task Dashboard";

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

export function setDocumentTitle(title: string) {
    document.title = title;
}

function App() {

    // Pomodoro Timer stuff
    let [option, timerStarted, timeRemaining, optionSet, setTimerStarted, setPlayedTimerEndSFX] = useTimer(APP_NAME, setDocumentTitle, 0);

    let [changeBackgroundColor, setChangeBackGroundColor] = useState(false);
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
            <Outlet context={[[option, timerStarted, timeRemaining, optionSet, setTimerStarted, setPlayedTimerEndSFX]]}/>
        </div>
    </div>
}

export default App;

export type {TodoType, TodoListType, NoteType};