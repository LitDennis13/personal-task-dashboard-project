import { useEffect, useState } from "react";
import timerEndSoundEffect from "../../assets/audio/timer_end_sound.mp3";

function playTimerEndSoundEffect() {
    new Audio(timerEndSoundEffect).play();
}

function useTimer(appName: string, setDocumentTitle: Function, defaultOption: number): any {
    const timeOptions = [1500, 300, 900];
    let [option, setOption] = useState(defaultOption);
    let [timerStarted, setTimerStarted] = useState(false);
    let [timeRemaining, setTimeRemaining] = useState(timeOptions[defaultOption]);
    let [playedTimerEndSFX, setPlayedTimerEndSFX] = useState(false);

    function optionSet(index: number) {
        setOption(index);
        setTimerStarted(false);
        setTimeRemaining(timeOptions[index]);
    }

    useEffect(() => {
        if (!timerStarted) return;
        else if (timeRemaining == 0) {
            setTimerStarted(false);
        }

        const intervalID = setInterval(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);

        return () => clearInterval(intervalID);
    });

    useEffect(()=>{
        if (timerStarted) {
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
            setDocumentTitle(onScreenMinutes + ":" + onScreenSeconds + " - " + appName)
        }
    });

    useEffect(() => {
        if (timeRemaining === 0 && !playedTimerEndSFX) {
            playTimerEndSoundEffect();
            setPlayedTimerEndSFX(true);
        }
    });

    return [option, timerStarted, timeRemaining, optionSet, setTimerStarted, setPlayedTimerEndSFX];
}

export default useTimer;