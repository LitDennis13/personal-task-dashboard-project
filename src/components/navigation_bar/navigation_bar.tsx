import styles from "./navigation_bar.module.css"

function NavigationBar() {

    return <nav className={styles.navigationBar}>
        <p className={styles.navigationBarTitle}>Personal Task Dashboard</p>
            <button>Dashboard</button>
            <button>Pomodoro Timer</button>
            <button>Todo List</button>
            <button>Notes</button>
    </nav>
}

export default NavigationBar;