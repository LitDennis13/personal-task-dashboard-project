import { Link } from "react-router-dom";

import styles from "./not_found.module.css";

function NotFound() {
    
    return <div className={styles.mainPage}>
        <p className={styles.message}>Page not found</p>
        <Link to={"/"}>
            <button className={styles.backToDashboardButton}>Back to Dashboard</button>
        </Link>
    </div>
}

export default NotFound;