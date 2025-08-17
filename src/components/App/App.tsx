import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import NavigationBar from "../navigation_bar/navigation_bar";
import useTimer from "../custom_hooks/use_timer";

import styles from "./page_layout.module.css";

export interface TodoType {
    todoID: number;
    name: string;
    note: string;
    hasNote: boolean;
    isComplete: boolean;
}

export interface TodoListType {
    listID: number;
    name: string;
    list: TodoType[];

}


function setDocumentTitle(title: string) {
    document.title = title;
}

function App() {
    let appName = "Personal Task Dashboard";

    // Pomodoro Timer stuff
    let [timerHasStarted, setTimerHasStarted] = useState(false);
    let [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useTimer(appName, setDocumentTitle, 0);

    // Todo List stuff
    let defaultTodoListData: TodoListType = {
        listID: 0,
        name: "My Day",
        list: [],
    };
    let [newID, setNewID] = useState(1);
    let [todoListData, setTodoListData] = useState([defaultTodoListData]);

    // Notes Stuff
    let [changeBackgroundColor, setChangeBackGroundColor] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/notes") {
            setChangeBackGroundColor(true);
        }
        else {
            setChangeBackGroundColor(false);
        }
    }, [location]);

    return <div id={changeBackgroundColor ? styles.changeBackgroundColor : ""}className={styles.mainStyle}>
        <div className={styles.navigationBarLocation}>
            <NavigationBar />
        </div>
        <div className={styles.mainContent}>
            <Outlet context={[appName, [option, timerStarted, timeRemaining, optionSet, setTimerStarted], [timerHasStarted, setTimerHasStarted], setDocumentTitle,
                [todoListData, setTodoListData], [newID, setNewID]]}/>
        </div>
    </div>
}

export default App;
