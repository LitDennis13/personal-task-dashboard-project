import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./todo_list.module.css";

import type { TodoType, TodoListType } from "../App/App";

function TodoList() {
    let [todoListOnDisplayID, setTodoListOnDisplayID] = useState(0);

    let [todoListData, setTodoListData] = useOutletContext<any>()[4];
    let [newID, setNewID] = useOutletContext<any>()[5];
    

    function sideBarOptionOnClick(listID: number) {
        setTodoListOnDisplayID(listID);
    }

    function loadSideBarOptions() {
        let options: any[] = [];
        let id: string;
        todoListData.map((element: TodoListType, index: number) => {
            if (element.listID == todoListOnDisplayID) {
                id = styles.selected;
            }
            else {
                id = "";
            }
            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(element.listID)}>{element.name}</button>;
        });

        return options;
    }

    function onNewListClick() {
        let newTodoList: TodoListType = {
            listID: newID,
            name: "Untitled List",
            list: []
        };


        setTodoListData([...todoListData, newTodoList]);
        setNewID(newID + 1);
    }



    return <div className={styles.mainStyle}>
        <div className={styles.sideBar}>
            <div className={styles.listTodoLists}>
                {loadSideBarOptions()}
            </div>
            <button className={styles.addTodoList} onClick={() => onNewListClick()}>+ New List</button>
        </div>
        <div className={styles.mainArea}></div>
    </div>
}

export default TodoList;