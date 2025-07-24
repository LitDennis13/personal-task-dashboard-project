import { useState } from "react";
import { Outlet } from "react-router";
import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./page_layout.module.css";

function setDocumentTitle(title: string) {
    document.title = title;
}

function App() {
    let appName = "Personal Task Dashboard";

    // Pomodoro Timer stuff
    let [timerHasStarted, setTimerHasStarted] = useState(false);
    let [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useTimer(appName, setDocumentTitle, 0);

    return <div className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet context={[appName, [option, timerStarted, timeRemaining, optionSet, setTimerStarted], [timerHasStarted, setTimerHasStarted], setDocumentTitle]}/>
        </div>
    </div>
}

export default App;