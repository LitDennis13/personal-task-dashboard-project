import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./App.module.css";

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

function setDocumentTitle(title: string) {
    document.title = title;
}

function emptyOrWhiteSpace(inString: string) {
    for (let i = 0; i < inString.length; i++) {
        if (inString[i] !== " ") {
            return false;
        }
    }
    return true;
}

function min(x: number, y: number) {
    if (x < y) return x;
    else return y;
}

function App() {
    // Pomodoro Timer stuff
    let [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone] = useTimer(APP_NAME, setDocumentTitle, 0);


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
            <Outlet context={
                {
                    pomodoroTimerRequirements: [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone],
                    dashboardRequirements: [timerStarted, timerStartStop, getTimerString, isTimerDone]
                }
            }/>
        </div>
    </div>
}

export default App;

export type {TodoType, TodoListType, NoteType};

export { setDocumentTitle, emptyOrWhiteSpace, min };