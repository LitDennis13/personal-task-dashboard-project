import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./todo_list.module.css";
import NoteIcon from "../../assets/images/notes.svg";
import CircleIcon from "../../assets/images/circle.svg";
import CircleCheckIcon from "../../assets/images/check_circle.svg";

import type { TodoType, TodoListType } from "../App/App";

function emptyOrWhiteSpace(inString: string) {
    for (let i = 0; i < inString.length; i++) {
        if (inString[i] !== " ") {
            return false;
        }
    }
    return true;
}

function TodoList() {
    let [todoListData, setTodoListData] = useOutletContext<any>()[4];
    let [newID, setNewID] = useOutletContext<any>()[5];

    let [selectedTodoList, setSelectedTodoList] = useState<TodoListType>(todoListData[0]);
    let [newListMade, setNewListMade] = useState(false);

    let newTodoDefaultState: TodoType = {
        todoID: 0,
        name: "",
        note: "",
        hasNote: false,
        isComplete: false
    };
    let [newTodo, setNewTodo] = useState<TodoType>(newTodoDefaultState);

    let todoListNameDisplay = useRef(null);

    function sideBarOptionOnClick(todoList: TodoListType) {
        setSelectedTodoList(todoList);
    }

    function loadSideBarOptions() {
        let options: any[] = [];
        let id: string;
        let displayName: string;
        
        todoListData.map((element: TodoListType, index: number) => {
            if (element.listID == selectedTodoList.listID) id = styles.selected;
            else id = "";
            
            displayName = element.name;
            if (element.name === "") displayName = "Untitled List";

            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(element)}>{displayName}</button>;
        });

        return options;
    }

    function onNewListClick() {
        let newTodoList: TodoListType = {
            listID: newID,
            name: "",
            list: []
        };

        setTodoListData([...todoListData, newTodoList]);
        setSelectedTodoList(newTodoList);
        setNewID(newID + 1);
        setNewListMade(true);
    }

    function updateTodoListName(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value;
        selectedTodoList.name = name;

        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                (todoListData[i] as TodoListType) = selectedTodoList;
                break;
            }
        }
        setTodoListData([...todoListData]);
    }

    function loadTodoListNameField() {
        if (selectedTodoList.listID === 0) {
            return <input type="text" value={selectedTodoList.name} readOnly/>;
        }
        else {
            return <input ref={todoListNameDisplay} type="text" value={selectedTodoList.name} placeholder="Untitled List" onChange={(event) => updateTodoListName(event)} onBlur={() => fixEmptyTodoListNames()} />;
        }
    }

    function fixEmptyTodoListNames() {
        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID && emptyOrWhiteSpace(todoListData[i].name)) {
                (todoListData[i] as TodoListType).name = "Untitled List";
                setTodoListData([...todoListData]);
            }
        }
    }

    function deleteListButtonOnClick() {
        let index = 0;
        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID === selectedTodoList.listID) {
                index = i;
                break;
            }
        }
        todoListData.splice(index, 1);

        setTodoListData([...todoListData]);
        setSelectedTodoList(todoListData[0]);
    }

    function loadDeleteListButton() {
        if (selectedTodoList.listID != 0) return <button className={styles.deleteListButton} onClick={() => deleteListButtonOnClick()}>Delete List</button>;
        else return "";
    }

    function loadTodosFromList() {
        let todos: any[] = [];

        selectedTodoList.list.map((todo: TodoType, index: number) => {
            let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

            let todoEntry = <div key={index} className={styles.todoCard}>
                <div className={styles.checkCompletedArea}>
                    <button>
                        <img src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>
                <p className={styles.todoName}>{todo.name}</p>
                {todo.hasNote ? <img className={styles.noteIcon} src={NoteIcon} alt="Note Icon" /> : ""}
            </div>;


            todos.push(todoEntry);
        });


        return todos;
    }



    function updateNewTodo(event: React.ChangeEvent<HTMLInputElement>) {
        newTodo.name = event.target.value;
        setNewTodo({...newTodo});
    }

    function addNewTodo(event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>)) {
        event.preventDefault();

        if (!emptyOrWhiteSpace(newTodo.name)) {
            newTodo.todoID = newID;
            
            for (let i = 0; i < todoListData.length; i++) {
                if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                    (todoListData[i] as TodoListType).list.push(newTodo);
                    break;
                }
            }
        }

        setNewID(newID + 1);
        setTodoListData([...todoListData]);
        setNewTodo({...newTodoDefaultState});
    }

    useEffect(() => {
        if (todoListNameDisplay.current !== null && newListMade == true) {
            (todoListNameDisplay.current as HTMLInputElement).focus();
            setNewListMade(false);
        }
    }, [newListMade]);

    console.log(todoListData);

    return <div className={styles.mainStyle}>
        <div className={styles.sideBar}>
            <div className={styles.listTodoLists}>
                {loadSideBarOptions()}
            </div>
            <button className={styles.addTodoList} onClick={() => onNewListClick()}>+ New List</button>
        </div>
        <div className={styles.mainArea}>
            <div className={styles.todoListNameDisplay}>
                {loadTodoListNameField()}
            </div>
            {loadDeleteListButton()}
            <div className={styles.todoListDisplay}>{loadTodosFromList()}</div>
            <form className={styles.addTodoArea} onSubmit={(event) => addNewTodo(event)}>
                <button onClick={(event) => addNewTodo(event)}>+</button>
                <input type="text" placeholder="Add Todo" value={newTodo.name} onChange={(event) => updateNewTodo(event)} />
            </form>
        </div>
    </div>
}

export default TodoList;
