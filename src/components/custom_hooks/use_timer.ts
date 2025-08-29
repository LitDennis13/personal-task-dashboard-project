import { useEffect, useState } from "react";

import timerEndSoundEffect from "../../assets/audio/timer_end_sound.mp3";

function playTimerEndSoundEffect() {
    new Audio(timerEndSoundEffect).play();
}

function useTimer(appName: string, setDocumentTitle: Function, defaultOption: number): any {
    const timeOptions = [1, 5, 15];
    let [option, setOption] = useState(defaultOption);
    let [timerStarted, setTimerStarted] = useState(false);
    let [timerHasStarted, setTimerHasStarted] = useState(false);
    let [playedTimerEndSFX, setPlayedTimerEndSFX] = useState(false);

    let [endTime, setEndTime] = useState(new Date());
    let [currentTime, setCurrentTime] = useState(new Date());
    let [timerPauseTime, setTimerPauseTime] = useState(new Date());
    let [minutesOffSet, setMinutesOffSet] = useState(-1);
    let [secondsOffSet, setSecondsOffSet] = useState(-1);
    let [miliSecondsOffSet, setMiliSecondsOffSet] = useState(-1);

    let [minutesLeft, setMinutesLeft] = useState(timeOptions[defaultOption]);
    let [secondsLeft, setSecondsLeft] = useState(0);

    
    function optionSet(index: number) {
        setOption(index);
        setMinutesLeft(timeOptions[index]);
        setSecondsLeft(0);

        setTimerStarted(false);
        setTimerHasStarted(false);
        setPlayedTimerEndSFX(false);
    }

    function timerStartStop() {
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
        console.log("Running End Time Setter");
        if (timerHasStarted) {
            let newEndTime = new Date();

            let minutesOFS = 60 - newEndTime.getMinutes();
            let secondsOFS = 59 - newEndTime.getSeconds();
            let milisecondsOFS = 1000 - newEndTime.getMilliseconds();

            newEndTime.setMinutes(newEndTime.getMinutes() + minutesOFS + timeOptions[option]);
            newEndTime.setSeconds(newEndTime.getSeconds() + secondsOFS);
            newEndTime.setMilliseconds(newEndTime.getMilliseconds() + milisecondsOFS);


            setEndTime(newEndTime);
            setTimerStarted(true);
            setMinutesOffSet(minutesOFS);
            setSecondsOffSet(secondsOFS);
            setMiliSecondsOffSet(milisecondsOFS);
        }
    }, [timerHasStarted]);

    useEffect(() => {
        if (timerHasStarted && !timerStarted) {
            // setTimerPauseTime(new Date());
        }
        if (!timerStarted) return;
        else if (minutesLeft === 0 && secondsLeft === 0) {
            setTimerStarted(false);
        }

        const intervalID = setInterval(() => {
            setCurrentTime(new Date());
        }, 500);

        return () => clearInterval(intervalID);
    });

    useEffect(() => {
        console.log("Running Minutes and Seconds Updater");
        if (timerStarted) {
            currentTime.setMinutes(currentTime.getMinutes() + minutesOffSet);
            currentTime.setSeconds(currentTime.getSeconds() + secondsOffSet);
            currentTime.setMilliseconds(currentTime.getMilliseconds() + miliSecondsOffSet);
            
            let newMinutesLeft = (endTime.getMinutes() - currentTime.getMinutes() - 1);
            let newSecondsLeft = (endTime.getSeconds() - currentTime.getSeconds() + 60);

            if (newMinutesLeft < 0) {
                newMinutesLeft = 0;
                newSecondsLeft = 0;
            }
            else if (newMinutesLeft === 0 && newSecondsLeft === 60) {
                newSecondsLeft = 59;
            }
            else if (newSecondsLeft === 60) {
                newSecondsLeft = 0;
            }
            setMinutesLeft(newMinutesLeft);
            setSecondsLeft(newSecondsLeft);
        }
    }, [currentTime]);

    useEffect(()=>{
        console.log("Running Document Title Updater");

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