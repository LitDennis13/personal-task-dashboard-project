import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

import { loadTimer } from "../pomodoro_timer/pomodoro_timer";
import styles from "./dashboard.module.css";

function Dashboard() {
    const [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useOutletContext<any>()[1];
    let [timerHasStarted, setTimerHasStarted] = useOutletContext<any>()[2];

    let [redirect, setRedirect] = useState(0);

    function loadTimerTitle() {
        if (!timerHasStarted && !timerStarted) {
            return "Timer not started";
        }
        else if (timerHasStarted && !timerStarted) {
            return "Timer stopped";
        }
        else {
            return "Time Remaining";
        }
    }

    function navigateToPomodoroTimer() {
        setRedirect(1);
    }

    function triggerRedirect() {
        if (redirect === 1) {
            return <Navigate to={"/pomodoro-timer"} replace/>;
        }
        else if (redirect === 2) {
            return <Navigate to={"/todo-list"} replace/>;
        }
        else if (redirect === 3) {
            return <Navigate to={"/notes"} replace/>;
        }
        return "";
    }


    return <div className={styles.mainStyle}>
        <div className={styles.pomodoroSpace} onClick={() => navigateToPomodoroTimer()}>
            <p className={styles.timerTitle}>{loadTimerTitle()}</p>
            <p className={styles.timeRemaining}>{timerStarted ? loadTimer(timeRemaining) : ""}</p>
        </div>
        <div className={styles.todoSpace}></div>
        <div className={styles.noteSpace}></div>

        {triggerRedirect()}
    </div>
}

export default Dashboard;