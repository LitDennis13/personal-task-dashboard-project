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
    const [milliSecondsOffSet, setMilliSecondsOffSet] = useState(-1);

    const [minutesLeft, setMinutesLeft] = useState(timeOptions[defaultOption]);
    const [secondsLeft, setSecondsLeft] = useState(0);

    /* Resets the timer by setting "minutesLeft" and "secondsLeft" to the original value of the time options
    and setting the "timerStarted", "timerHasStarted", and "playedTimerEndSFX" state's to false */
    function timerReset(index: number) {
        setMinutesLeft(timeOptions[index]);
        setSecondsLeft(0);

        setTimerStarted(false);
        setTimerHasStarted(false);
        setPlayedTimerEndSFX(false);
    }

    /* Changes time option used and calls "timerReset" to reset the timer */
    function optionSet(index: number) {
        setOption(index);
        timerReset(index);
    }

    /* Sets the state of "endTime" to the time when the timer will end by adding an offset to the minutes, seconds, and miliseconds so the end
    time's minutes are 0 minutes, 0 seconds, and 0 milliseconds (milliseconds wont always be accurate however the inaccuracy is insignificant).
    After offsetting everying to zero it adds the timing remaining in from the mintues and seconds parameters so the end time will be 
    minutes:seconds. After it adds the time remaining it sets the state of the "endTime" to this new time and sets the "minutesOffSet",
    "secondsOffSet", and "millisecondsOffSet" to the calculated offsets */
    function updateEndTime(mintues: number, seconds: number) {
        let newEndTime = new Date();
        
        let minutesOFS = 59 - newEndTime.getMinutes();
        let secondsOFS = 59 - newEndTime.getSeconds();
        let millisecondsOFS = 999 - newEndTime.getMilliseconds();

        newEndTime.setMinutes(newEndTime.getMinutes() + minutesOFS + mintues);
        newEndTime.setSeconds(newEndTime.getSeconds() + secondsOFS + (seconds === 0 ? seconds : seconds + 1)); // if seconds does not equal zero then it means the timer was paused and 1 will be added to the seconds to prevent the seconds going down by one when the start/stop function is click, however the seconds still go down by one if seconds === 0
        newEndTime.setMilliseconds(newEndTime.getMilliseconds() + millisecondsOFS);
        
        setEndTime(newEndTime);
        setMinutesOffSet(minutesOFS);
        setSecondsOffSet(secondsOFS);
        setMilliSecondsOffSet(millisecondsOFS);
    }

    /* Updates the "timerStarted" state to the opposite of its value in-order to start and stop the timer. If the timer
    is paused and unpaused it calls "updateEndTime" to create a new ending time with however many seconds and minutes are left
    to go. Also on first run it will set the "timerHasStarted" state to true which stays true until the timer resets */
    function timerStartStop() {
        if (timerHasStarted && !timerStarted) updateEndTime(minutesLeft, secondsLeft); // Runs when timer was paused and then unpaused

        if (!timerStarted) setTimerHasStarted(true); // runs when timer starts but after one run "timerHasStarted" state will stay true until the timer resets

        setTimerStarted(!timerStarted);
    }

    function getTimerString() {
        return (minutesLeft < 10 ? "0" : "") + minutesLeft.toString() + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft.toString();
    }

    /* When the timer is done the "minutesLeft" and "secondsLeft" will be zero*/
    function isTimerDone() {
        if (minutesLeft === 0 && secondsLeft === 0) return true;
        return false;
    }

    /* This useEffect runs when the the timer starts for the first time or resets (because it relies on "timerHasStarted" state).
    If the timer is starting for the first time then it will call the "updateEndTime" function to set a new end time with time
    option selected */
    useEffect(() => {
        if (timerHasStarted) {
            updateEndTime(timeOptions[option], 0);
        }
    }, [timerHasStarted]);

    /* This useEffect runs every time the component re-renders (the re-renders will usually be caused by state updates) and if the
    timer is started it will update the state of "currentTime" to the latest Date() object. If the timer is not started nothing happens
    and if the timer is done then it sets the "timerStarted" state to false */
    useEffect(() => {
        if (isTimerDone()) {
            setTimerStarted(false);
        }
        else if (timerStarted) {
            const intervalID = setInterval(() => {
                setCurrentTime(new Date());
            }, 100);

            return () => clearInterval(intervalID);
        }
    });
    
    /* This useEffect runs every time the "currentTime" state is updated and sets the states of "minutesLeft" and "secondsLeft" using
    the difference in minutes and seconds with in the "endTime" and "currentTime" objects which is how to timer actually ticks down */
    useEffect(() => {
        if (timerStarted) {
            currentTime.setMinutes(currentTime.getMinutes() + minutesOffSet); // (currentTime.getMinutes() + minutesOffSet) is equal to 60, however after 59 it resets back to 0
            currentTime.setSeconds(currentTime.getSeconds() + secondsOffSet); // (currentTime.getSeconds() + secondsOffSet) is equal to 60, and the same thing happens as above and it also adds one minute since it thinks it hit 60 seconds
            currentTime.setMilliseconds(currentTime.getMilliseconds() + milliSecondsOffSet);
           
            let newMinutesLeft = (endTime.getMinutes() - currentTime.getMinutes());
            let newSecondsLeft = (endTime.getSeconds() - currentTime.getSeconds());
            
            setMinutesLeft(newMinutesLeft);
            setSecondsLeft(newSecondsLeft);
        }
    }, [currentTime]);

    /* This useEffect runs every time "minutesLeft", "secondsLeft", "timerStarted" updates. If the timer is started then
    the it shows the time remaining in the the title of the document and if the timer is stopped it shows to normal
    document name */
    useEffect(()=>{
        if (timerStarted) {
            setDocumentTitle(getTimerString() + " - " + appName)
        }
        else {
            setDocumentTitle(appName);
        }
    }, [minutesLeft, secondsLeft, timerStarted]);

    /* This useEffect runs every time the component re-renders (the re-renders will usually be caused by state updates) and
    checks if the timer is done and the "playedTimerEndSoundEffect" is false, if so it plays the timer end sound effect */
    useEffect(() => {
        if (isTimerDone() && !playedTimerEndSFX) {
            playTimerEndSoundEffect();
            setPlayedTimerEndSFX(true);
        }
    });

    return [option, timerStarted, timerHasStarted, timerStartStop, timerReset, optionSet, getTimerString, isTimerDone];
}

export default useTimer;