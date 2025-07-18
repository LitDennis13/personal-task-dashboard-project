import { Outlet } from "react-router";
import NavigationBar from "../navigation_bar/navigation_bar";

import styles from "./page_layout.module.css";

function PageLayout() {

    return <div className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet/>
        </div>
    </div>
}

export default PageLayout;