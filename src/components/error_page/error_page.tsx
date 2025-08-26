import styles from "./error_page.module.css";

function ErrorPage() {

    return <div className={styles.mainPage}>
        <p className={styles.messageTitle}>Error Page</p>
        <p className={styles.messageBody}>Please check the console for errors and/or refresh the page</p>
    </div>
}

export default ErrorPage;