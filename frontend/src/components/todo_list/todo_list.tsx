import { useEffect, useRef, useState } from "react";

import { emptyOrWhiteSpace } from "../App/App";
import type { TodoListType, TodoType } from "../../types";
import { TodoListDataStore, useNewIDStore, useSelectedTodoIDStore, useSelectedTodoListStore } from "../../store";

import styles from "./todo_list.module.css";

import NoteIcon from "../../assets/images/notes.svg";
import CircleIcon from "../../assets/images/circle.svg";
import CircleCheckIcon from "../../assets/images/check_circle.svg";
import UpArrow from "../../assets/images/up_arrow.svg";
import DownArrow from "../../assets/images/down_arrow.svg";
import TaskCompleteSoundEffect from "../../assets/audio/task_complete_sound.mp3";

function playTaskCompleteSoundEffect() {
    new Audio(TaskCompleteSoundEffect).play();
}

function updateCompletionStatus(selectedTodoList: TodoListType, todoListData: TodoListType[], setTodoCompletionStatus: any, ID: number) {
    let todoIndex = -1;
    let completionStatus = false;

    for (let i = 0; i < selectedTodoList.list.length; i++) {
        if (selectedTodoList.list[i].todoID === ID) {
            todoIndex = i;
            completionStatus = !selectedTodoList.list[i].isComplete;   
        }
    }

    for (let i = 0; i < todoListData.length; i++) {
        if (todoListData[i].listID === selectedTodoList.listID) {
            setTodoCompletionStatus(i, todoIndex, completionStatus);

            if (completionStatus) {
                playTaskCompleteSoundEffect();
            }
            break;
        }
    }
}

function TodoList() {    
    const TODO_CARD_ID = "TodoCard";
    const TODO_CHECK_BUTTON = "TodoCheckButton";
    const EDIT_TODO_AREA = "EditTodoArea";
    const DELETE_LIST_BUTTON = "DeleteListButton";
    const DELETE_TODO_BUTTON = "DeleteTodoButton";


    const todoListData = TodoListDataStore((state) => state.value);
    const addTodolist = TodoListDataStore((state) => state.addTodolist);
    const setTodoListName = TodoListDataStore((state) => state.setTodoListName);
    const deleteTodoList = TodoListDataStore((state) => state.deleteTodoList);
    const switchListIDs = TodoListDataStore((state) => state.switchListIDs);
    const addTodo = TodoListDataStore((state) => state.addTodo);
    const setTodoName = TodoListDataStore((state) => state.setTodoName);
    const setTodoNote = TodoListDataStore((state) => state.setTodoNote);
    const setTodoCompletionStatus = TodoListDataStore((state) => state.setTodoCompletionStatus);
    const deleteTodo = TodoListDataStore((state) => state.deleteTodo);
    const updateTodoPosition = TodoListDataStore((state) => state.updateTodoPosition);
    

    const newID = useNewIDStore((state) => state.value);
    const incrementNewID = useNewIDStore((state) => state.incrementNewID);

    const selectedTodoList = useSelectedTodoListStore((state) => state.value);
    const setSelectedTodoList = useSelectedTodoListStore((state) => state.setSelectedTodoList);

    const selectedTodoID = useSelectedTodoIDStore((state) => state.value);
    const setSelectedTodoID = useSelectedTodoIDStore((state) => state.setSelectedTodoID);

    const [newListMade, setNewListMade] = useState(false);
    const [focusOnTodoListName, setFocusOnTodoListName] = useState(false);


    const [deleteListPressed, setDeleteListPressed] = useState(false);
    const [deleteTodoPressed, setDeleteTodoPressed] = useState(false);

    const newTodoDefaultState: TodoType = {
        todoID: 0,
        name: "",
        note: "",
        hasNote: false,
        isComplete: false
    };
    
    const [newTodo, setNewTodo] = useState<TodoType>(newTodoDefaultState);

    const todoListNameDisplay = useRef(null);

    const [draggingTodo, setDraggingTodo] = useState<TodoType>({...newTodoDefaultState, todoID: -1});
    const [recentTodoDragOver, setRecentTodoDragOver] = useState<TodoType>({...newTodoDefaultState, todoID: -1});

    /* This function closes the todo editor by setting the "selectedTodoID" state to -1.
    It also has an option to check the current todo's name is empty and if so updating 
    that todo's name to be "Untitled Todo" */
    function closeTodoEditArea(checkEmptyTodo: boolean = true) {
        if (checkEmptyTodo) {
            let todo: TodoType = newTodoDefaultState;
            let todoIndex: number = -1;
            for (let i = 0; i < selectedTodoList.list.length; i++) {
                if (selectedTodoList.list[i].todoID === selectedTodoID) {
                    todo = selectedTodoList.list[i];
                    todoIndex = i;
                }
            }

            if (emptyOrWhiteSpace(todo.name)) {                
                for (let i = 0; i < todoListData.length; i++) {
                    if (todoListData[i].listID === selectedTodoList.listID) {
                        setTodoName(i,todoIndex,"Untitled Todo");
                        break;
                    }
                }
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
            if (element.listID === selectedTodoList.listID) id = styles.selected;
            else id = "";
            
            displayName = element.name;
            if (element.name === "") displayName = "Untitled List";

            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(element)}>{displayName}</button>;
        });

        return <>
            {options[0]}
            {options.length > 1 ? <div className={styles.sideBarLineBreak}></div> : ""}
            {options.slice(1, options.length)}
        </>;
    }

    function onNewListClick() {
        addTodolist(newID);
        incrementNewID();
        setNewListMade(true);
    }

    function updateTodoListName(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value;

        for (let i = 0; i < todoListData.length; i++) {
            if (todoListData[i].listID === selectedTodoList.listID) {
                setTodoListName(i, name);
                break;
            }
        }
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
            if (todoListData[i].listID === selectedTodoList.listID && emptyOrWhiteSpace(todoListData[i].name)) {
                setTodoListName(i, "Untitled List");
            }
        }
    }

    function deleteListButtonOnClick() {
        setDeleteListPressed(true);
    }

    function confirmDeleteListButtonOnClick() {
        for (let i = 0; i < todoListData.length; i++) {
            if (todoListData[i].listID === selectedTodoList.listID) {
                deleteTodoList(i);
                break;
            }
        }
        
        setSelectedTodoList(todoListData[0]);
        setDeleteListPressed(false);
    }

    function moveListUpOnClick() {
        for (let index = 1; index < todoListData.length; index++) {
            let indexBefore = index - 1;

            if (todoListData[index].listID === selectedTodoList.listID && todoListData[indexBefore].listID !== 0) {
                switchListIDs(indexBefore, index);
                break;
            }
        }
    }

    function moveListDownOnClick() {
        for (let index = 0; index < todoListData.length; index++) {
            let indexAfter = index + 1;

            if (todoListData[index].listID === selectedTodoList.listID && indexAfter < todoListData.length) {
                switchListIDs(index, indexAfter);
                break;
            }
        }
    }

    function loadTodoListManagement() {
        if (selectedTodoList.listID != 0 && selectedTodoID === -1) {
            let deleteButton: any;
            let loadMoveListUp = true;
            let loadMoveListDown = true;

            if (todoListData[1].listID === selectedTodoList.listID) loadMoveListUp = false;
            if (todoListData[todoListData.length - 1].listID === selectedTodoList.listID) loadMoveListDown = false;

            let deleteButtonStyles = styles.deleteListButton + " " + (loadMoveListUp || loadMoveListDown ? styles.deleteListButtonWithListMoves : styles.deleteListButtonOnly);

            if (deleteListPressed) {
                deleteButton = <button id={DELETE_LIST_BUTTON} className={deleteButtonStyles} onClick={() => confirmDeleteListButtonOnClick()}>Confirm</button>;
            } 
            else {
                deleteButton = <button id={DELETE_LIST_BUTTON} className={deleteButtonStyles} onClick={() => deleteListButtonOnClick()}>Delete List</button>;
            }

            return <div className={styles.todoListManagementArea}>
                {loadMoveListUp ? <button className={styles.moveListButton + " " + (loadMoveListDown ? styles.moveListUpButton : styles.moveListUpOnlyButton)} onClick={() => moveListUpOnClick()}>
                    <img src={UpArrow} alt="Move list up" />
                </button> : ""}

                {loadMoveListDown ? <button className={styles.moveListButton + " " + (loadMoveListUp ? styles.moveListDownButton : styles.moveListDownOnlyButton)} onClick={() => moveListDownOnClick()}>
                    <img src={DownArrow} alt="Move list down" />
                </button> : ""}

                {deleteButton}
            </div>
        }
        else return "";
    }

    /* This function sets the "draggingTodo" state to the todo that the user has started dragging
    and it sets the "recentTodoDragOver" state to the todo that the user is dragging as well
    to signal that the most recent todo that was dragged over was itself */
    function onTodoDragStart(todo: TodoType) {
        setDraggingTodo(todo);
        setRecentTodoDragOver(todo);
        closeTodoEditArea();
    }

    /* This function swaps the todo id's of the todo being dragged and the todo being dragged over and then the todo data gets
    sorted by id to change the position of the todos */
    function onTodoDragOver(event: React.DragEvent<HTMLDivElement>, currentTodoDragOver: TodoType) {
        event.preventDefault();

        if (recentTodoDragOver.todoID !== currentTodoDragOver.todoID) {
            let oldIndex = -1;
            let newIndex = -1;
            let oldID = currentTodoDragOver.todoID;
            let newID = draggingTodo.todoID;

            for (let i = 0; i < selectedTodoList.list.length; i++) {
                if (selectedTodoList.list[i].todoID === oldID) {
                    oldIndex = i;
                }
                if (selectedTodoList.list[i].todoID === newID) {
                    newIndex = i;
                } 
            }

            for (let i = 0; i < todoListData.length; i++) {
                if (todoListData[i].listID === selectedTodoList.listID) {
                    updateTodoPosition(i, oldID, oldIndex, newID, newIndex);
                    break;
                }
            }
            setRecentTodoDragOver(currentTodoDragOver);
        }
    }

    function todoOnClickFunction(event: React.MouseEvent<HTMLDivElement, MouseEvent>, todoID: number) {
        if (event.target instanceof Element && event.target.parentNode !== null && (event.target.parentNode as Element).id === TODO_CHECK_BUTTON) {
            return;
        }
        if (todoID === selectedTodoID) {
            closeTodoEditArea();
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

            let todoEntry = <div id={TODO_CARD_ID} key={index} className={styles.todoCard + " " + (todo.todoID === selectedTodoID ? styles.todoCardSelected : styles.todoCardNotSelected)} draggable={todo.isComplete ? "false" : "true"} onClick={(event) => todoOnClickFunction(event, todo.todoID)} onDragStart={() => onTodoDragStart(todo)} onDragOver={(event) => onTodoDragOver(event, todo)}>
                <div className={styles.checkCompletedArea}>
                    <button id={TODO_CHECK_BUTTON} onClick={() => updateCompletionStatus(selectedTodoList, todoListData, setTodoCompletionStatus, todo.todoID)}>
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

        return <>
            {notCompleteTodos}
            {completeTodos.length !== 0 ? <p className={styles.completedTitle}>Completed</p> : ""}
            {completeTodos}
        </>
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
                if (todoListData[i].listID === selectedTodoList.listID) {
                    addTodo(i, newTodo);
                    break;
                }
            }
        }

        incrementNewID();
        setNewTodo({...newTodoDefaultState});
    }

    function onTodoNameChange(event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) {
        let name = event.target.value;

        for (let i = 0; i < todoListData.length; i++) {
            if (todoListData[i].listID === selectedTodoList.listID) {
                setTodoName(i, todoIndex, name);
                break;
            }
        }
    }

    function onTodoNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>, todoIndex: number) {
        let note = event.target.value;

        for (let i = 0; i < todoListData.length; i++) {
            if (todoListData[i].listID === selectedTodoList.listID) {
                setTodoNote(i, todoIndex, note);
                break;
            }
        }
    }

    function onTodoDeleteClick() {
        setDeleteTodoPressed(true);
    }

    function onConfirmTodoDeleteClick(todoIndex: number) {
        for (let i = 0; i < todoListData.length; i++) {
            if (todoListData[i].listID === selectedTodoList.listID) {
                deleteTodo(i, todoIndex);
                break;
            }
        }

        closeTodoEditArea(false);
        setDeleteTodoPressed(false);
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
                    <button onClick={() => updateCompletionStatus(selectedTodoList, todoListData, setTodoCompletionStatus, todo.todoID)}>
                        <img src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>

                <input type="text" placeholder="Untitled Todo" value={todo.name} onChange={(event) => onTodoNameChange(event, todoIndex)} className={styles.editTodoName}/>
                
                <textarea placeholder="Note" value={todo.note} onChange={((event) => onTodoNoteChange(event, todoIndex))} className={styles.editTodoNote}></textarea>

                <button id={DELETE_TODO_BUTTON} className={styles.deleteTodoButton} 
                    onClick={deleteTodoPressed ? () => onConfirmTodoDeleteClick(todoIndex) : () => onTodoDeleteClick()}>
                        {deleteTodoPressed ? "Confirm" :"Delete Todo"}
                </button>
            </div>;
        }
        return "";
    }

    function onMainPageClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target instanceof Element) {
            if (event.target.parentNode !== null 
                && event.target.parentNode.parentNode !== null 
                && event.target.parentNode.parentNode.parentNode !== null 
                && (event.target.parentNode.parentNode.parentNode as Element).id !== TODO_CARD_ID 
                && (event.target.parentNode as Element).id !== TODO_CARD_ID 
                && (event.target.parentNode.parentNode.parentNode as Element).id !== EDIT_TODO_AREA 
                && (event.target.parentNode as Element).id !== EDIT_TODO_AREA
                && (event.target as Element).id !== EDIT_TODO_AREA) {

                closeTodoEditArea(false);
            }

            if (event.target.id !== DELETE_LIST_BUTTON) {
                setDeleteListPressed(false);
            }

            if (event.target.id !== DELETE_TODO_BUTTON) {
                setDeleteTodoPressed(false);
            }
        }
    }

    /* This useEffect runs when a new todo list is created and it
    sets the state of "selectedTodoList" to the new todo list created
    and sets the state of "focusOnTodoListName" to true so that the
    useEffect below will make the page focus on the input element
    that contains the title for the new todo list */
    useEffect(() => {
        if (newListMade) {
            setSelectedTodoList(todoListData[todoListData.length - 1]);
            setNewListMade(false);
            setFocusOnTodoListName(true);
        }
        
    }, [newListMade]);

    /* This useEffect runs when the state of "focusOnTodoListName" is changed
    and if "focusOnTodoListName" is true then the page will focus on the
    input element for the todo list title */
    useEffect(() => {
        if (todoListNameDisplay.current !== null && focusOnTodoListName === true) {
            (todoListNameDisplay.current as HTMLInputElement).focus();
            setFocusOnTodoListName(false);
        }
    }, [focusOnTodoListName]);

    return <div className={styles.mainStyle}  onMouseDown={(event) => onMainPageClick(event)}>
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

            {loadTodoListManagement()}

            {((selectedTodoList as TodoListType).list.length >= 1) 
            ? 
                <div className={styles.todoListDisplay + " " + styles.withTodos}>
                    {loadTodosFromList()}
                </div> 
            : 
                <div className={styles.todoListDisplay + " " + styles.withOutTodos}>
                    <p className={styles.noTodosMessage}> This list has no todos</p>
                </div>
            }

            <form className={styles.addTodoArea} onSubmit={(event) => addNewTodo(event)}>
                <button onClick={(event) => addNewTodo(event)}>+</button>
                <input type="text" placeholder="Add Todo" value={newTodo.name} onChange={(event) => updateNewTodo(event)} />
            </form>

            {loadEditTodoArea()}
        </div>
    </div>
}

export default TodoList;
export { updateCompletionStatus };