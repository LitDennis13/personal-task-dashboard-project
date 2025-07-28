import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./todo_list.module.css";

import type { TodoType, TodoListType } from "../App/App";

function TodoList() {
    let [todoListData, setTodoListData] = useOutletContext<any>()[4];
    let [newID, setNewID] = useOutletContext<any>()[5];

    let [selectedTodoList, setSelectedTodoList] = useState<TodoListType>(todoListData[0]);

    

    function sideBarOptionOnClick(todoList: TodoListType) {
        setSelectedTodoList(todoList);
    }

    function loadSideBarOptions() {
        let options: any[] = [];
        let id: string;
        todoListData.map((element: TodoListType, index: number) => {
            if (element.listID == selectedTodoList.listID) {
                id = styles.selected;
            }
            else {
                id = "";
            }
            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(element)}>{element.name}</button>;
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
        setSelectedTodoList(newTodoList);
        setNewID(newID + 1);
    }

    function loadTodoListName() {
        return selectedTodoList.name;

    }


    return <div className={styles.mainStyle}>
        <div className={styles.sideBar}>
            <div className={styles.listTodoLists}>
                {loadSideBarOptions()}
            </div>
            <button className={styles.addTodoList} onClick={() => onNewListClick()}>+ New List</button>
        </div>
        <div className={styles.mainArea}>
            <div className={styles.todoListNameDisplay}>
                <p>{loadTodoListName()}</p>
            </div>
            <div className={styles.todoListDisplay}>{}</div>
            <form className={styles.addTodoArea}>
                {/* <input type="text" placeholder="Add Todo" /> */}
            </form>
        </div>
    </div>
}

export default TodoList;