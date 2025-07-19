import styles from "./dashboard.module.css";

function Dashboard() {

    return <div className={styles.mainStyle}>
        <div className={styles.pomodoroSpace}></div>
        <div className={styles.todoSpace}></div>
        <div className={styles.noteSpace}></div>
    </div>
}

export default Dashboard;