import { Link } from "react-router-dom";

import styles from "./navigation_bar.module.css";

function NavigationBar() {

    return <nav className={styles.navigationBar}>
        <p className={styles.navigationBarTitle}>Personal Task Dashboard</p>
        
        <Link to={"/"}>
            <button>Dashboard</button>
        </Link>

        <Link to={"/pomodoro-timer"}>
            <button>Pomodoro Timer</button>
        </Link>

        <Link to={"todo-list"}>
            <button>Todo List</button>
        </Link>

        <Link to={"notes"}>
            <button>Notes</button>
        </Link>
    </nav>
}

export default NavigationBar;