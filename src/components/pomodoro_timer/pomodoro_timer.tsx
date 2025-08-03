import { useOutletContext } from "react-router-dom";

import styles from "./pomodoro_timer.module.css";
import clickSoundEffect from "../../assets/audio/bubble_sound_effect.m4a";

function playClickSoundEffect() {
    new Audio(clickSoundEffect).play();
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

    function loadPomodoroTimerStyle() {
        if (isTimerDone()) {
            return styles.pomodoroTimerWithHardReset;
        }
        else {
            return styles.pomodoroTimer;
        }
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

    function startStopOnClick() {
        if (!timerStarted) {
            setTimerHasStarted(true);
        }

        setTimerStarted(!timerStarted);

        playClickSoundEffect();
    }

    function loadStartTimerButton() {
        if (isTimerDone()) return;

        let id: string;

        if (timerStarted) {
            id = styles.timerStarted;
        }
        else {
            id = styles.timerNotStarted;
            setDocumentTitle(appName);
        }
        
        return <button id={id} onClick={() => startStopOnClick()}>Start</button>
    }

    function loadResetAreaStyle() {
        if (timerHasStarted) {
            return styles.resetButtonArea;
        }
        return styles.resetButtonAreaNoButton;
    }

    function resetButtonOnClick() {
        optionSet(option); // triggers re-render
        setTimerHasStarted(false);
        playClickSoundEffect();
    }

    function loadResetButton() {
        if (timerHasStarted) {
            if (isTimerDone()) {
                return <button id={styles.resetOptionOnly} onClick={() => resetButtonOnClick()}>Reset</button>;
            }
            return <button onClick={() => resetButtonOnClick()}>Reset</button>;
        }
        setDocumentTitle(appName);
        return;
    }


    return <div className={styles.mainStyle}>
        <div className={loadPomodoroTimerStyle()}>
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
        <div className={loadResetAreaStyle()}>
            {loadResetButton()}
        </div>
    </div>
}

export default PomodoroTimer;