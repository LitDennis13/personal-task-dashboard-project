import { useEffect, useState } from "react";

function useTimer(defaultOption: number): any {
    const timeOptions = [1500, 300, 900];
    let [option, setOption] = useState(defaultOption);
    let [timerStarted, setTimerStarted] = useState(false);
    let [timeRemaining, setTimeRemaining] = useState(timeOptions[defaultOption]);

    function optionSet(index: number) {
        setOption(index);
        setTimerStarted(false);
        setTimeRemaining(timeOptions[index]);
    }

    useEffect(() => {
        if (!timerStarted) return;

        const intervalID = setInterval(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);

        return () => clearInterval(intervalID);
    });

    return [option, timerStarted, timeRemaining, optionSet, setTimerStarted];
}

export default useTimer;