import styles from "./todo_list.module.css";

function TodoList() {
    let numOfSideBarOptions = 1;
    const sideBarOptions = [
        "My Day",
    ];

    function loadSideBarOptions() {
        let options: any[] = [];
        sideBarOptions.map((element, index) => {
            options[index] = <button key={index}>{element}</button>;
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