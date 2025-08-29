import { useEffect, useState } from "react";

import timerEndSoundEffect from "../../assets/audio/timer_end_sound.mp3";

function playTimerEndSoundEffect() {
    new Audio(timerEndSoundEffect).play();
}

function useTimer(appName: string, setDocumentTitle: Function, defaultOption: number): any {
    const timeOptions = [25, 5, 15];
    const [option, setOption] = useState(defaultOption);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerHasStarted, setTimerHasStarted] = useState(false);
    const [playedTimerEndSFX, setPlayedTimerEndSFX] = useState(false);

    const [endTime, setEndTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [minutesOffSet, setMinutesOffSet] = useState(-1);
    const [secondsOffSet, setSecondsOffSet] = useState(-1);
    const [miliSecondsOffSet, setMiliSecondsOffSet] = useState(-1);

    const [minutesLeft, setMinutesLeft] = useState(timeOptions[defaultOption]);
    const [secondsLeft, setSecondsLeft] = useState(0);

    function optionSet(index: number) {
        setOption(index);
        setMinutesLeft(timeOptions[index]);
        setSecondsLeft(0);

        setTimerStarted(false);
        setTimerHasStarted(false);
        setPlayedTimerEndSFX(false);
    }

    function updateEndTime(mintues: number, seconds: number) {
        let newEndTime = new Date();

        let minutesOFS = 60 - newEndTime.getMinutes();
        let secondsOFS = 59 - newEndTime.getSeconds();
        let milisecondsOFS = 1000 - newEndTime.getMilliseconds();

        newEndTime.setMinutes(newEndTime.getMinutes() + minutesOFS + mintues);
        newEndTime.setSeconds(newEndTime.getSeconds() + secondsOFS + seconds - 1);
        newEndTime.setMilliseconds(newEndTime.getMilliseconds() + milisecondsOFS);
        
        setEndTime(newEndTime);
        setTimerStarted(true);
        setMinutesOffSet(minutesOFS);
        setSecondsOffSet(secondsOFS);
        setMiliSecondsOffSet(milisecondsOFS);
    }

    function timerStartStop() {
        if (timerHasStarted && !timerStarted) {
            updateEndTime(minutesLeft, secondsLeft);
        }
        if (!timerStarted) {
            setTimerHasStarted(true);
        }

        setTimerStarted(!timerStarted);
    }

    function timerReset() {
        setMinutesLeft(timeOptions[option]);
        setSecondsLeft(0);

        setTimerStarted(false);
        setTimerHasStarted(false);
        setPlayedTimerEndSFX(false);
    }

    function getTimerString() {
        return (minutesLeft < 10 ? "0" : "") + minutesLeft.toString() + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft.toString();
    }

    function isTimerDone() {
        if (minutesLeft === 0 && secondsLeft === 0) return true;
        return false;
    }

    useEffect(() => {
        if (timerHasStarted) {
            updateEndTime(timeOptions[option], 0);
        }
    }, [timerHasStarted]);

    useEffect(() => {
        if (!timerStarted) return;
        else if (minutesLeft === 0 && secondsLeft === 0) {
            setTimerStarted(false);
        }

        const intervalID = setInterval(() => {
            setCurrentTime(new Date());
        }, 100);

        return () => clearInterval(intervalID);
    });

    useEffect(() => {
        if (timerStarted) {
            currentTime.setMinutes(currentTime.getMinutes() + minutesOffSet); // (currentTime.getMinutes() + minutesOffSet) is equal to 60, however after 59 it resets back to 0
            currentTime.setSeconds(currentTime.getSeconds() + secondsOffSet); // (currentTime.getSeconds() + secondsOffSet) is equal to 60, and the same thing happens as above and it also adds one minute since it thinks it hit 60 seconds
            currentTime.setMilliseconds(currentTime.getMilliseconds() + miliSecondsOffSet);
           
            let newMinutesLeft = (endTime.getMinutes() - currentTime.getMinutes());
            let newSecondsLeft = (endTime.getSeconds() - currentTime.getSeconds());
            
            setMinutesLeft(newMinutesLeft);
            setSecondsLeft(newSecondsLeft);
        }
    }, [currentTime]);

    useEffect(()=>{
        if (timerStarted) {
            setDocumentTitle(getTimerString() + " - " + appName)
        }
        else {
            setDocumentTitle(appName);
        }
    }, [minutesLeft, secondsLeft]);

    useEffect(() => {
        if (minutesLeft === 0 && secondsLeft === 0 && !playedTimerEndSFX) {
            playTimerEndSoundEffect();
            setPlayedTimerEndSFX(true);
        }
    });

    return [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone];
}

export default useTimer;