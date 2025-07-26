import { useState } from "react";
import styles from "./todo_list.module.css";

function TodoList() {
    let [sideBarOption, setSideBarOption] = useState(0);

    const sideBarOptions = [
        "My Day",
    ];

    function sideBarOptionOnClick(index: number) {
        setSideBarOption(index);
    }

    function loadSideBarOptions() {
        let options: any[] = [];
        let id: string;
        sideBarOptions.map((element, index) => {
            if (index == sideBarOption) {
                id = styles.selected;
            }
            else {
                id = "";
            }
            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(index)}>{element}</button>;
        });

        return options;
    }



    return <div className={styles.mainStyle}>
        <div className={styles.sideBar}>
            {loadSideBarOptions()}
        </div>
        <div className={styles.mainArea}></div>
    </div>
}

export default TodoList;