import { Outlet } from "react-router";
import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./page_layout.module.css";

function App() {
    // Pomodoro Timer stuff
    let [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useTimer(0);

    return <div className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet context={[[option, timerStarted, timeRemaining, optionSet, setTimerStarted]]}/>
        </div>
    </div>
}

export default App;