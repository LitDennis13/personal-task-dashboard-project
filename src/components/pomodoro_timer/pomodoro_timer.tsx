import { useOutletContext } from "react-router-dom";

import styles from "./pomodoro_timer.module.css";
import clickSoundEffect from "../../assets/audio/bubble_sound_effect.m4a";

function playClickSoundEffect() {
    new Audio(clickSoundEffect).play();
}

export function loadTimer(timeLeft: number) {
        let minutes = Math.floor(timeLeft/60);
        let seconds = timeLeft - minutes*60;

        let onScreenMinutes = minutes.toString();
        let onScreenSeconds = seconds.toString();

        if (minutes < 10) {
            onScreenMinutes = "0" + onScreenMinutes;
        }
        if (seconds < 10) {
            onScreenSeconds = "0" + onScreenSeconds;
        }

        return onScreenMinutes + ":"+ onScreenSeconds;
    }

function PomodoroTimer() {
    const appName = useOutletContext<any>()[0];
    const [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useOutletContext<any>()[1];
    let [timerHasStarted, setTimerHasStarted] = useOutletContext<any>()[2];
    let setDocumentTitle = useOutletContext<any>()[3];

    function isTimerDone() {
        if (timeRemaining == 0) {
            return true;
        }
        return false;
    }

    function onNavigationBarChange(index: number) {
        optionSet(index);
        setTimerHasStarted(false);
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

            returnArray[index] = <button key={index} id={id} className={classStyle} onClick={() => onNavigationBarChange(index)}>{element}</button>;
        });

        return returnArray;
    }


    function startStopOnClick() {
        if (!timerStarted) {
            setTimerHasStarted(true);
        }

        setTimerStarted(!timerStarted);

        playClickSoundEffect();
    }

    function loadStartTimerButton() {
        if (isTimerDone()) return "";

        let id: string;

        if (timerStarted) {
            id = styles.timerStarted;
        }
        else {
            id = styles.timerNotStarted;
            setDocumentTitle(appName);
        }
        return <button id={id} className={styles.resetButton + " " + (timerHasStarted ? styles.startButtonWithReset : styles.startButtonOptionOnly)}onClick={() => startStopOnClick()}>Start</button>
    }

    function resetButtonOnClick() {
        optionSet(option); // triggers re-render
        setTimerHasStarted(false);
        playClickSoundEffect();
    }

    function loadResetButton() {
        if (timerHasStarted) {
            return <button className={styles.resetButton + " " + (isTimerDone() ? styles.resetOptionOnly : styles.resetOptionWithStart)} onClick={() => resetButtonOnClick()}>Reset</button>;
        }
        setDocumentTitle(appName);
        return "";
    }


    return <div className={styles.mainStyle}>
        <div className={styles.pomodoroTimer}>
            <nav className={styles.navigationBar}>
                {loadNavigationBarOptions().map((element) => {
                    return element;
                })}
            </nav>
            <div className={styles.timer}>
                <p>{loadTimer(timeRemaining)}</p>
            </div>
            <div className={styles.controls}>
                {loadStartTimerButton()}
                {loadResetButton()}
            </div>
        </div>
        
    </div>
}

export default PomodoroTimer;