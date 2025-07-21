import { useState } from "react";
import { Outlet } from "react-router";
import NavigationBar from "../navigation_bar/navigation_bar";

import styles from "./page_layout.module.css";

function App() {
    // Pomodoro Timer stuff
    let [option, setOption] = useState(0);

    return <div className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet context={[option, setOption]}/>
        </div>
    </div>
}

export default App;