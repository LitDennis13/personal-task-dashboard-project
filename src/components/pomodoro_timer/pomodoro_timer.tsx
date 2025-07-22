import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./pomodoro_timer.module.css";

function PomodoroTimer() {
    const timeOptions = [1500, 300, 900];
    const [option, setOption] = useOutletContext<any>()[0];
    const [timerStarted, setTimerStarted] = useOutletContext<any>()[1];
    const [timeRemaining, setTimeRemaining] = useOutletContext<any>()[2];

    function onNavigationOptionSelect(index: number) {
        setOption(index);
        setTimerStarted(false);
        setTimeRemaining(timeOptions[index]);
    }

    function loadNavigationBarOptions() {
        let numOfOptions = 3;
        let navigationBarOptions = [
            "Pomodoro",
            "Short Break",
            "Long Break"
        ];
        
        let returnArray: any[] = [];
        let id: string;
        let classStyle: string;

        navigationBarOptions.map((element, index) => {
            if (index == option) {
                id = styles.selected;
            }
            else {
                id = "";
            }

            if (index == 0) {
                classStyle = styles.roundLeft;
            }
            else if (index == numOfOptions - 1) {
                classStyle = styles.roundRight;

            }
            else {
                classStyle = "";
            }

            returnArray[index] = <button key={index} id={id} className={classStyle} onClick={() => onNavigationOptionSelect(index)}>{element}</button>;
        });

        return returnArray;
    }

    function loadTimer() {
        let minutes = Math.floor(timeRemaining/60);
        let seconds = timeRemaining - minutes*60;

        let onScreenMinutes = minutes.toString();
        let onScreenSeconds = seconds.toString();

        if (minutes < 10) {
            onScreenMinutes = "0" + onScreenMinutes;
        }
        if (seconds < 10) {
            onScreenSeconds = "0" + onScreenSeconds;
        }

        return <p>{onScreenMinutes}:{onScreenSeconds}</p>;
    }

    function onStartStopClick() {        
        setTimerStarted(!timerStarted);
        
        
    }

    function loadStartTimerButton() {
        let id: string;
        if (timerStarted) {
            id = styles.timerStarted;
        }
        else {
            id = styles.timerNotStarted;
        }
        
        return <button id={id} onClick={() => onStartStopClick()}>Start</button>
    }


    useEffect(() => {
        const intervalID = setInterval(() => {
            if (timerStarted) {
                setTimeRemaining(timeRemaining - 1);
            }
        }, 1000);

        return () => clearInterval(intervalID);
    });

    return <div className={styles.mainStyle}>
        <div className={styles.pomodoroTimer}>
            <nav className={styles.navigationBar}>
                {loadNavigationBarOptions().map((element) => {
                    return element;
                })}
            </nav>
            <div className={styles.timer}>
                {loadTimer()}
            </div>
            <div className={styles.controls}>
                {loadStartTimerButton()}
            </div>
        </div>
    </div>
}

export default PomodoroTimer;