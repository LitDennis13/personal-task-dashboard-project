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
    const TODO_CARD_ID = "TodoCard";
    const TODO_CHECK_BUTTON = "TodoCheckButton";
    const EDIT_TODO_AREA = "EditTodoArea";

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

    let [draggingTodo, setDraggingTodo] = useState<TodoType>({...newTodoDefaultState, todoID: -1});
    let [recentTodoDragOver, setRecentTodoDragOver] = useState<TodoType>({...newTodoDefaultState, todoID: -1});

    let [selectedTodoID, setSelectedTodoID] = useState(-1);

    function closeTodoEditArea(instantClose: boolean = false) {
        if (!instantClose) {
            let todo: TodoType = newTodoDefaultState;
            let todoIndex: number = -1;
            for (let i = 0; i < selectedTodoList.list.length; i++) {
                if (selectedTodoList.list[i].todoID === selectedTodoID) {
                    todo = selectedTodoList.list[i];
                    todoIndex = i;
                }
            }

            if (emptyOrWhiteSpace(todo.name)) {
                selectedTodoList.list[todoIndex].name = "Untitled Todo";
                
                for (let i = 0; i < todoListData.length; i++) {
                    if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                        (todoListData[i] as TodoListType) = selectedTodoList;
                        break;
                    }
                }
                setTodoListData([...todoListData]);
            }
        }

        setSelectedTodoID(-1);
    }

    function sideBarOptionOnClick(todoList: TodoListType) {
        setSelectedTodoList(todoList);
        closeTodoEditArea();
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
        if (selectedTodoList.listID != 0 && selectedTodoID === -1) return <button className={styles.deleteListButton} onClick={() => deleteListButtonOnClick()}>Delete List</button>;
        else return "";
    }

    function updateCompletionStatus(ID: number) {
        for (let i = 0; i < selectedTodoList.list.length; i++) {
            if ((selectedTodoList.list[i] as TodoType).todoID == ID) {
                (selectedTodoList.list[i] as TodoType).isComplete = !(selectedTodoList.list[i] as TodoType).isComplete;
            }
        }

        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                (todoListData[i] as TodoListType) = selectedTodoList;
                break;
            }
        }
        setTodoListData([...todoListData]);
    }

    function onTodoDragStart(todo: TodoType) {
        setDraggingTodo(todo);
        setRecentTodoDragOver(todo);
        closeTodoEditArea()
    }

    function onTodoDragOver(event: React.DragEvent<HTMLDivElement>, currentTodoDragOver: TodoType) {
        event.preventDefault();

        if (recentTodoDragOver.todoID !== currentTodoDragOver.todoID) {
            let oldID = currentTodoDragOver.todoID;
            let newID = draggingTodo.todoID;

            for (let i = 0; i < selectedTodoList.list.length; i++) {
                if ((selectedTodoList as TodoListType).list[i].todoID == oldID) {
                    (selectedTodoList as TodoListType).list[i].todoID = newID;
                }
                else if ((selectedTodoList as TodoListType).list[i].todoID == newID) {
                    (selectedTodoList as TodoListType).list[i].todoID = oldID;
                } 
            }

            (selectedTodoList as TodoListType).list.sort((entry1, entry2) => entry1.todoID - entry2.todoID);

            for (let i = 0; i < todoListData.length; i++) {
                if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                    (todoListData[i] as TodoListType) = selectedTodoList;
                    break;
                }
            }
            setTodoListData([...todoListData]);
            setRecentTodoDragOver(currentTodoDragOver);
        }
    }

    function todoOnClickFunction(event: React.MouseEvent<HTMLDivElement, MouseEvent>, todoID: number) {
        if (event.target instanceof Element && event.target.parentNode !== null && (event.target.parentNode as Element).id === TODO_CHECK_BUTTON) {
            return;
        }
        if (todoID === selectedTodoID) {
            closeTodoEditArea()
        }
        else {
            setSelectedTodoID(todoID);
        }
    }

    function loadTodosFromList() {
        let notCompleteTodos: any[] = [];
        let completeTodos: any[] = [];

        selectedTodoList.list.map((todo: TodoType, index: number) => {
            let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

            let todoEntry = <div id={TODO_CARD_ID} key={index} className={styles.todoCard} draggable={todo.isComplete ? "false" : "true"} onClick={(event) => todoOnClickFunction(event, todo.todoID)} onDragStart={() => onTodoDragStart(todo)} onDragOver={(event) => onTodoDragOver(event, todo)}>
                <div className={styles.checkCompletedArea}>
                    <button id={TODO_CHECK_BUTTON} onClick={() => updateCompletionStatus(todo.todoID)}>
                        <img src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>
                <p className={styles.todoName}>{emptyOrWhiteSpace(todo.name) ? "Untitled Todo" : todo.name}</p>
                {todo.hasNote ? <img className={styles.noteIcon} src={NoteIcon} alt="Note Icon" /> : ""}
            </div>;

            if (todo.isComplete) {
                completeTodos.push(todoEntry);
            }
            else {
                notCompleteTodos.push(todoEntry);
            }
        });

        return [...notCompleteTodos, ...completeTodos];
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

    function onTodoNameChange(event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) {
        selectedTodoList.list[todoIndex].name = event.target.value;

        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                (todoListData[i] as TodoListType) = selectedTodoList;
                break;
            }
        }
        setTodoListData([...todoListData]);
    }

    function onTodoNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>, todoIndex: number) {
        selectedTodoList.list[todoIndex].note = event.target.value;

        if (emptyOrWhiteSpace(selectedTodoList.list[todoIndex].note)) {
            selectedTodoList.list[todoIndex].hasNote = false;
        }
        else {
            selectedTodoList.list[todoIndex].hasNote = true;
        }

        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                (todoListData[i] as TodoListType) = selectedTodoList;
                break;
            }
        }
        setTodoListData([...todoListData]);
    }

    function onTodoDeleteClick(todoIndex: number) {
        selectedTodoList.list.splice(todoIndex, 1);

        for (let i = 0; i < todoListData.length; i++) {
            if ((todoListData[i] as TodoListType).listID == selectedTodoList.listID) {
                (todoListData[i] as TodoListType) = selectedTodoList;
                break;
            }
        }

        setTodoListData([...todoListData]);
        closeTodoEditArea(true);
    }

    function loadEditTodoArea() {
        let todo: TodoType = newTodoDefaultState;
        let todoIndex: number = -1;
        for (let i = 0; i < selectedTodoList.list.length; i++) {
            if (selectedTodoList.list[i].todoID === selectedTodoID) {
                todo = selectedTodoList.list[i];
                todoIndex = i;
            }
        }
        
        let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

        if (selectedTodoID !== -1) {
            return <div id={EDIT_TODO_AREA} className={styles.editTodoArea}>
                <div className={styles.editTodoCompletionStatus}>
                    <button onClick={() => updateCompletionStatus(todo.todoID)}>
                        <img src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>

                <input type="text" placeholder="Untitled Todo" value={todo.name} onChange={(event) => onTodoNameChange(event, todoIndex)} className={styles.editTodoName}/>
                
                <textarea placeholder="Note" value={todo.note} onChange={((event) => onTodoNoteChange(event, todoIndex))} className={styles.editTodoNote}></textarea>

                <button className={styles.deleteTodoButton} onClick={() => onTodoDeleteClick(todoIndex)}>Delete Todo</button>
            </div>;
        }
        return "";
    }

    function onMainPageClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target instanceof Element && event.target.parentNode !== null 
            && event.target.parentNode.parentNode !== null 
            && event.target.parentNode.parentNode.parentNode !== null 
            && (event.target.parentNode.parentNode.parentNode as Element).id !== TODO_CARD_ID 
            && (event.target.parentNode as Element).id !== TODO_CARD_ID 
            && (event.target.parentNode.parentNode.parentNode as Element).id !== EDIT_TODO_AREA 
            && (event.target.parentNode as Element).id !== EDIT_TODO_AREA
            && (event.target as Element).id !== EDIT_TODO_AREA) {

            closeTodoEditArea(true);
        }
    }

    useEffect(() => {
        if (todoListNameDisplay.current !== null && newListMade == true) {
            (todoListNameDisplay.current as HTMLInputElement).focus();
            setNewListMade(false);
        }
    }, [newListMade]);
    
    return <div className={styles.mainStyle}  onClick={(event) => onMainPageClick(event)}>
        <div className={styles.sideBar}>
            <div className={styles.listTodoLists}>
                {loadSideBarOptions()}
            </div>
            <button className={styles.addTodoList} onClick={() => onNewListClick()}>+ New List</button>
        </div>
        <div id={selectedTodoID !== -1 ? styles.showEditTodoArea : ""} className={styles.mainArea}>
            <div className={styles.todoListNameDisplay}>
                {loadTodoListNameField()}
            </div>

            {loadDeleteListButton()}

            <div className={styles.todoListDisplay}>{loadTodosFromList()}</div>
            <form className={styles.addTodoArea} onSubmit={(event) => addNewTodo(event)}>
                <button onClick={(event) => addNewTodo(event)}>+</button>
                <input type="text" placeholder="Add Todo" value={newTodo.name} onChange={(event) => updateNewTodo(event)} />
            </form>

            {loadEditTodoArea()}
        </div>
    </div>
}

export default TodoList;
