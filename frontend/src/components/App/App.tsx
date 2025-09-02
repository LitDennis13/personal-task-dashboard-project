import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import { useNewIDStore } from "../../store";

import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./App.module.css";

const APP_NAME = "Personal Task Dashboard";

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
   // Timer Stuff
    const [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone] = useTimer(APP_NAME, setDocumentTitle, 0);


    const [changeBackgroundColor, setChangeBackGroundColor] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/pomodoro-timer" || location.pathname === "/todo-list") {
            setChangeBackGroundColor(false);
        }
        else {
            setChangeBackGroundColor(true);
        }
    }, [location]);

    //Setup Stuff
    useEffect(() => {
        // Set "newID" value to lastest value from database 
        const updateNewID = useNewIDStore.getState().updateNewID;
        updateNewID();

    }, []);

    
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

export { APP_NAME, setDocumentTitle, emptyOrWhiteSpace, min };