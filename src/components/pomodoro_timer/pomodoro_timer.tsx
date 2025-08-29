import { useOutletContext } from "react-router-dom";

import styles from "./pomodoro_timer.module.css";

import clickSoundEffect from "../../assets/audio/bubble_sound_effect.m4a";

function playClickSoundEffect() {
    new Audio(clickSoundEffect).play();
}


function PomodoroTimer() {
    const [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone] = useOutletContext<any>().pomodoroTimerRequirements;
  
    function onNavigationBarChange(index: number) {
        optionSet(index);
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
        timerStartStop();

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
        }
        return <button id={id} className={styles.resetButton + " " + (timerHasStarted ? styles.startButtonWithReset : styles.startButtonOptionOnly)}onClick={() => startStopOnClick()}>Start</button>
    }

    function resetButtonOnClick() {
        timerReset();
        playClickSoundEffect();
    }

    function loadResetButton() {
        if (timerHasStarted) {
            return <button className={styles.resetButton + " " + (isTimerDone() ? styles.resetOptionOnly : styles.resetOptionWithStart)} onClick={() => resetButtonOnClick()}>Reset</button>;
        }
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
                <p>{getTimerString()}</p>
            </div>
            <div className={styles.controls}>
                {loadStartTimerButton()}
                {loadResetButton()}
            </div>
        </div>
        
    </div>
}

export default PomodoroTimer;
export { playClickSoundEffect };