import { useEffect, useRef, useState } from "react";

import { emptyOrWhiteSpace } from "../App/App";
import type { TodoListType, TodoType } from "../../types";
import { SelectedTodoListDataStore, useSelectedTodoIDStore, useSelectedTodoListIDStore } from "../../store";
import { useNewID } from "../custom_hooks/use_newID";

import styles from "./todo_list.module.css";

import NoteIcon from "../../assets/images/notes.svg";
import CircleIcon from "../../assets/images/circle.svg";
import CircleCheckIcon from "../../assets/images/check_circle.svg";
import UpArrow from "../../assets/images/up_arrow.svg";
import DownArrow from "../../assets/images/down_arrow.svg";
import TaskCompleteSoundEffect from "../../assets/audio/task_complete_sound.mp3";
import { useTodoListData } from "../custom_hooks/use_todoListData";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { SetTodoCompletionStatusData } from "../../api/todoListData";

function playTaskCompleteSoundEffect() {
    new Audio(TaskCompleteSoundEffect).play();
}

function getTodoListIndex(todoListData: TodoListType[], listID: number) {
    for (let i = 0; i < todoListData.length; i++) {
        if (todoListData[i].listID === listID) {
            return i;
        }
    }
    return -1;
}

async function updateCompletionStatus(todoListData: TodoListType[], selectedTodoListIndex: number, setTodoCompletionStatus: UseMutateAsyncFunction<void, Error, SetTodoCompletionStatusData, unknown>, ID: number) {
    let todoID = -1;
    let completionStatus = false;

    for (let i = 0; i < todoListData[selectedTodoListIndex].list.length; i++) {
        if (todoListData[selectedTodoListIndex].list[i].todoID === ID) {
            todoID = todoListData[selectedTodoListIndex].list[i].todoID;
            completionStatus = !todoListData[selectedTodoListIndex].list[i].isComplete;   
        }
    }

    await setTodoCompletionStatus({todoID, status: completionStatus});

    if (completionStatus) {
        playTaskCompleteSoundEffect();
    }
}

function TodoList() {    
    const TODO_CARD_ID = "TodoCard";
    const TODO_CHECK_BUTTON = "TodoCheckButton";
    const EDIT_TODO_AREA = "EditTodoArea";
    const DELETE_LIST_BUTTON = "DeleteListButton";
    const DELETE_TODO_BUTTON = "DeleteTodoButton";

    const newID = useNewID();

    const todoListData = useTodoListData();

    const selectedTodoListDataLocal = SelectedTodoListDataStore((state) => state.value);
    
    const [todoPositionChangeLog, setTodoPositionChangeLog] = useState<number[][]>([]);

    const selectedTodoListID = useSelectedTodoListIDStore((state) => state.value);
    const setSelectedTodoListID = useSelectedTodoListIDStore((state) => state.setSelectedTodoListID);

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
        isComplete: false,
        associatedListIdentifier: 0,
    };
    
    const [newTodo, setNewTodo] = useState<TodoType>(newTodoDefaultState);

    const todoListNameDisplay = useRef(null);

    const [draggingTodo, setDraggingTodo] = useState<TodoType>({...newTodoDefaultState, todoID: -1});
    const [recentTodoDragOver, setRecentTodoDragOver] = useState<TodoType>({...newTodoDefaultState, todoID: -1});

    function closeTodoEditArea(checkEmptyTodo: boolean = true) {
        if (checkEmptyTodo && selectedTodoID !== -1) {
            const selectedTodoListIndex = getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID);
            let todoName = "";
            let todoIndex = -1;
            
            for (let i = 0; i < todoListData.data[selectedTodoListIndex].list.length; i++) {
                if (todoListData.data[selectedTodoListIndex].list[i].todoID === selectedTodoID) {
                    todoName = todoListData.data[selectedTodoListIndex].list[i].name;
                    todoIndex = i;

                }
            }

            if (emptyOrWhiteSpace(todoName)) {     
                selectedTodoListDataLocal.setTodoName(todoIndex, "Untitled Todo");
            }
        }
        setSelectedTodoID(-1);
    }

    function sideBarOptionOnClick(todoListID: number) {
        setSelectedTodoListID(todoListID);
        closeTodoEditArea();
    }

    function loadSideBarOptions() {
        let options: any[] = [];
        let id: string;
        let displayName: string;
        
        todoListData.data.map((element: TodoListType, index: number) => {
            if (element.listID === selectedTodoListDataLocal.data.listID) id = styles.selected;
            else id = "";
            
            displayName = element.name;
            if (element.listID === selectedTodoListDataLocal.data.listID) displayName = selectedTodoListDataLocal.data.name;
            if (displayName === "") displayName = "Untitled List";

            options[index] = <button id={id} key={index} onClick={() => sideBarOptionOnClick(element.listID)}>{displayName}</button>;
        });

        return <>
            {options[0]}
            {options.length > 1 ? <div className={styles.sideBarLineBreak}></div> : ""}
            {options.slice(1, options.length)}
        </>;
    }

    async function onNewListClick() {
        await todoListData.addTodoList({listID: newID.data});
        await newID.incrementNewID();
        setNewListMade(true);
    }

    function updateLocalTodoListName(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value;

        selectedTodoListDataLocal.setTodoListName(name);
    }

    async function updateServerTodoListName() {
        if (emptyOrWhiteSpace(selectedTodoListDataLocal.data.name)) {
            await todoListData.setTodoListName({listID: selectedTodoListDataLocal.data.listID, newName: "Untitled List"});
        }
        else {
            await todoListData.setTodoListName({listID: selectedTodoListDataLocal.data.listID, newName: selectedTodoListDataLocal.data.name});
        }

    }

    function loadTodoListNameField() {
        if (selectedTodoListDataLocal.data.listID === 0) {
            return <input type="text" value={selectedTodoListDataLocal.data.name} readOnly/>;
        }
        else {
            return <input ref={todoListNameDisplay} type="text" value={selectedTodoListDataLocal.data.name} placeholder="Untitled List" onChange={(event) => updateLocalTodoListName(event)} onBlur={() => updateServerTodoListName()} />;
        }
    }    

    function deleteListButtonOnClick() {
        setDeleteListPressed(true);
    }

    async function confirmDeleteListButtonOnClick() {
        await todoListData.deleteTodoList({listID: selectedTodoListDataLocal.data.listID});

        setSelectedTodoListID(0);
        setDeleteListPressed(false);
    }

    async function moveListUpOnClick() {
        for (let index = 1; index < todoListData.data.length; index++) {
            let indexBefore = index - 1;

            if (todoListData.data[index].listID === selectedTodoListDataLocal.data.listID && todoListData.data[indexBefore].listID !== 0) {
                await todoListData.switchListIDs({listIDOne: todoListData.data[indexBefore].listID, listIDTwo: selectedTodoListDataLocal.data.listID});
                setSelectedTodoListID(todoListData.data[indexBefore].listID);
                break;
            }
        }
    }

    async function moveListDownOnClick() {
        for (let index = 0; index < todoListData.data.length; index++) {
            let indexAfter = index + 1;

            if (todoListData.data[index].listID === selectedTodoListDataLocal.data.listID && indexAfter < todoListData.data.length) {
                await todoListData.switchListIDs({listIDOne: selectedTodoListDataLocal.data.listID, listIDTwo: todoListData.data[indexAfter].listID});
                setSelectedTodoListID(todoListData.data[indexAfter].listID);
                break;
            }
        }
    }

    function loadTodoListManagement() {
        if (selectedTodoListDataLocal.data.listID != 0 && selectedTodoID === -1) {
            let deleteButton: any;
            let loadMoveListUp = true;
            let loadMoveListDown = true;

            if (todoListData.data[1].listID === selectedTodoListDataLocal.data.listID) loadMoveListUp = false;
            if (todoListData.data[todoListData.data.length - 1].listID === selectedTodoListDataLocal.data.listID) loadMoveListDown = false;

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

    function onTodoDragStart(todo: TodoType) {
        setDraggingTodo(todo);
        setRecentTodoDragOver(todo);
        closeTodoEditArea();
    }

    function onTodoDragOver(event: React.DragEvent<HTMLDivElement>, currentTodoDragOver: TodoType) {
        const selectedTodoListIndex = getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID);
        event.preventDefault();

        if (recentTodoDragOver.todoID !== currentTodoDragOver.todoID) {
            let oldIndex = -1;
            let newIndex = -1;
            let oldID = currentTodoDragOver.todoID;
            let newID = draggingTodo.todoID;

            for (let i = 0; i < todoListData.data[selectedTodoListIndex].list.length; i++) {
                if (todoListData.data[selectedTodoListIndex].list[i].todoID === oldID) {
                    oldIndex = i;
                }
                if (todoListData.data[selectedTodoListIndex].list[i].todoID === newID) {
                    newIndex = i;
                } 
            }

            setTodoPositionChangeLog([...todoPositionChangeLog, [oldID, newID]]);
            selectedTodoListDataLocal.updateTodoPosition(oldID, oldIndex, newID, newIndex);
            
            setRecentTodoDragOver(currentTodoDragOver);
        }
    }

    async function onTodoDrop() {
        await todoListData.updateTodoPositions(todoPositionChangeLog);
        setTodoPositionChangeLog([]);
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
        updateTodoName();
        updateTodoNote();
    }

    function loadTodosFromList() {
        const selectedTodoListIndex = getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID);
        let notCompleteTodos: any[] = [];
        let completeTodos: any[] = [];

        selectedTodoListDataLocal.data.list.map((todo: TodoType, index: number) => {
            let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

            let todoEntry = <div id={TODO_CARD_ID} key={index} className={styles.todoCard + " " + (todo.todoID === selectedTodoID ? styles.todoCardSelected : styles.todoCardNotSelected)} draggable={todo.isComplete ? "false" : "true"} onClick={(event) => todoOnClickFunction(event, todo.todoID)} onDragStart={() => onTodoDragStart(todo)} onDragOver={(event) => onTodoDragOver(event, todo)} onDrop={() => onTodoDrop()}>
                <div className={styles.checkCompletedArea}>
                    <button id={TODO_CHECK_BUTTON} onClick={() => updateCompletionStatus(todoListData.data, selectedTodoListIndex, todoListData.setTodoCompletionStatus, todo.todoID)}>
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

    async function addNewTodo(event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>)) {
        event.preventDefault();

        if (!emptyOrWhiteSpace(newTodo.name)) {
            newTodo.todoID = newID.data;
            newTodo.associatedListIdentifier = selectedTodoListDataLocal.data.listIdentifier;
            await todoListData.addTodo(newTodo);
        }

        await newID.incrementNewID();
        setNewTodo({...newTodoDefaultState});
    }

    function onTodoNameChange(event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) {
        let name = event.target.value;

        selectedTodoListDataLocal.setTodoName(todoIndex, name);
    }

    async function updateTodoName() {
        if (selectedTodoID === -1) return;
        let todoIndex = -1;

        for (let i = 0; i < selectedTodoListDataLocal.data.list.length; i++) {
            if (selectedTodoListDataLocal.data.list[i].todoID === selectedTodoID) {
                todoIndex = i;
                break;
            }
        }

        await todoListData.setTodoName({todoID: selectedTodoListDataLocal.data.list[todoIndex].todoID, newTodoName: selectedTodoListDataLocal.data.list[todoIndex].name});
    }

    function onTodoNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>, todoIndex: number) {
        let note = event.target.value;
        
        selectedTodoListDataLocal.setTodoNote(todoIndex, note);
    }

    async function updateTodoNote() {
        if (selectedTodoID === -1) return;
        let todoIndex = -1;

        for (let i = 0; i < selectedTodoListDataLocal.data.list.length; i++) {
            if (selectedTodoListDataLocal.data.list[i].todoID === selectedTodoID) {
                todoIndex = i;
                break;
            }
        }

        await todoListData.setTodoNote({todoID: selectedTodoListDataLocal.data.list[todoIndex].todoID, newTodoNote: selectedTodoListDataLocal.data.list[todoIndex].note});
    }

    function onTodoDeleteClick() {
        setDeleteTodoPressed(true);
    }

    async function onConfirmTodoDeleteClick(todoID: number) {
        await todoListData.deleteTodo(todoID);

        closeTodoEditArea(false);
        setDeleteTodoPressed(false);
    }

    function loadEditTodoArea() {
        const selectedTodoList = todoListData.data[getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID)];
        let todo: TodoType = newTodoDefaultState;
        let todoID: number = -1;
        let todoIndex: number = -1;
        for (let i = 0; i < selectedTodoList.list.length; i++) {
            if (selectedTodoList.list[i].todoID === selectedTodoID) {
                todo = selectedTodoList.list[i];
                todoID = selectedTodoList.list[i].todoID;
                todoIndex = i;
            }
        }
        
        let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

        if (selectedTodoID !== -1) {
            return <div id={EDIT_TODO_AREA} className={styles.editTodoArea}>
                <div className={styles.editTodoCompletionStatus}>
                    <button onClick={() => updateCompletionStatus(todoListData.data, getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID), todoListData.setTodoCompletionStatus, todo.todoID)}>
                        <img src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>

                <input type="text" placeholder="Untitled Todo" value={todo.name} onChange={(event) => onTodoNameChange(event, todoIndex)} className={styles.editTodoName}/>
                
                <textarea placeholder="Note" value={todo.note} onChange={((event) => onTodoNoteChange(event, todoIndex))} className={styles.editTodoNote}></textarea>

                <button id={DELETE_TODO_BUTTON} className={styles.deleteTodoButton} 
                    onClick={deleteTodoPressed ? () => onConfirmTodoDeleteClick(todoID) : () => onTodoDeleteClick()}>
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

                closeTodoEditArea(true);
                updateTodoName();
                updateTodoNote();
            }

            if (event.target.id !== DELETE_LIST_BUTTON) {
                setDeleteListPressed(false);
            }

            if (event.target.id !== DELETE_TODO_BUTTON) {
                setDeleteTodoPressed(false);
            }

        }
    }

    useEffect(() => {
        if (!todoListData.loadingTodoListData){
            for (const list of todoListData.data) {
                if (list.listID === selectedTodoListID) {
                    selectedTodoListDataLocal.updateSelectedTodoListData(list);
                }
            }
        }
    }, [todoListData.loadingTodoListData, selectedTodoListID, todoListData.data]);

    useEffect(() => {
        if (newListMade) {
            setSelectedTodoListID(todoListData.data[todoListData.data.length - 1].listID);
            setNewListMade(false);
            setFocusOnTodoListName(true);
        }
    }, [todoListData.data]);

    useEffect(() => {
       if (todoListNameDisplay.current !== null && focusOnTodoListName === true) {
            (todoListNameDisplay.current as HTMLInputElement).focus();
            setFocusOnTodoListName(false);
        }
    }, [focusOnTodoListName, {...todoListNameDisplay}]);


    return !todoListData.loadingTodoListData ? <div className={styles.mainStyle}  onMouseDown={(event) => onMainPageClick(event)}>
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

            {(todoListData.data[getTodoListIndex(todoListData.data, selectedTodoListDataLocal.data.listID)].list.length >= 1)
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
    </div>: "";
}

export default TodoList;
export { getTodoListIndex, updateCompletionStatus };