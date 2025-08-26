import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../state/store";
import { setTimerHasStarted } from "../../state/timer_has_started/timerHasStarted";
import { loadTimer, playClickSoundEffect } from "../pomodoro_timer/pomodoro_timer";
import NoteIcon from "../../assets/images/notes.svg";
import CircleIcon from "../../assets/images/circle.svg";
import CircleCheckIcon from "../../assets/images/check_circle.svg";
import { updateCompletionStatus } from "../todo_list/todo_list";
import type { NoteType, TodoListType, TodoType } from "../App/App";

import styles from "./dashboard.module.css";
import TodoListStyles from "../todo_list/todo_list.module.css";
import NotesStyles from "../notes/notes.module.css";

function min(x: number, y: number) {
    if (x < y) return x;
    else return y;
}

function Dashboard() {
    const dispatch = useDispatch();
    const TODO_COMPLETE_BUTTON_IMAGE_ID = "TodoCompleteButtonImage";

    const [option, timerStarted, timeRemaining, optionSet, setTimerStarted] = useOutletContext<any>()[1];
    const timerHasStarted = useSelector((state: RootState) => state.timerHasStarted.value);


    let [selectedTodoList, setSelectedTodoList] = useOutletContext<any>()[7];
    let [todoListData, setTodoListData] = useOutletContext<any>()[4];
    let [selectedTodoID, setSelectedTodoID] = useOutletContext<any>()[8];

    let [notesData, setNotesData] = useOutletContext<any>()[6];
    let [selectedNoteIndex, setSelectedNoteIndex] = useOutletContext<any>()[9];


    let [redirect, setRedirect] = useState(0);

    function loadTimerTitle() {
        if (!timerStarted) {
            return "Timer stopped";
        }
        else {
            return "Time Remaining";
        }
    }

    function pomodoroSpaceOnClick() {
        if (timeRemaining === 0) {
            setRedirect(1);
        }
        else {
            if (!timerStarted) {
                dispatch(setTimerHasStarted(true));
            }
            setTimerStarted(!timerStarted);
        }

        playClickSoundEffect();
    }

    function todoOnClickFunction(event: React.MouseEvent<HTMLDivElement, MouseEvent>, todoID: number) {
        if (event.target instanceof HTMLImageElement && event.target.id === TODO_COMPLETE_BUTTON_IMAGE_ID) {
            return;
        }
        setSelectedTodoID(todoID);
        setRedirect(2);
    }

    function loadTodosFromList() {
        let notCompleteTodos: any[] = [];
        let completeTodos: any[] = [];

        selectedTodoList.list.map((todo: TodoType, index: number) => {
            let IconImage = todo.isComplete ? CircleCheckIcon : CircleIcon;

            let todoEntry = <div key={index} className={TodoListStyles.todoCard + " " + TodoListStyles.todoCardNotSelected} onClick={(event) => todoOnClickFunction(event, todo.todoID)}>
                <div className={TodoListStyles.checkCompletedArea}>
                    <button onClick={() => updateCompletionStatus(selectedTodoList, todoListData, setTodoListData, todo.todoID)}>
                        <img id={TODO_COMPLETE_BUTTON_IMAGE_ID} src={IconImage} alt="Completed/Not Completed icon" />
                    </button>
                </div>
                <p className={TodoListStyles.todoName}>{todo.name}</p>
                {todo.hasNote ? <img className={TodoListStyles.noteIcon} src={NoteIcon} alt="Note Icon" /> : ""}
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
            {completeTodos.length !== 0 ? <p className={TodoListStyles.completedTitle}>Completed</p> : ""}
            {completeTodos}
        </>
    }

    function noteOnClick(noteIndex: number) {
        setSelectedNoteIndex(noteIndex);
        setRedirect(3);
    }

    function loadNotes() {
        let returnData: any[] = [];

        for (let i = 0; i < min(notesData.length, 4); i++) {
            let foundNewLine = false;
            let title = "";
            let note = "";
            for (const c of (notesData[i] as NoteType).note) {
                if (c === "\n" && !foundNewLine) {
                    foundNewLine = true;
                }
                else if (!foundNewLine) {
                    title += c;
                }
                else {
                    note += c;
                }
            }

            let noteEntry = <button key={i} className={NotesStyles.noteEntry + " " + NotesStyles.dashBoardNoteEntry} onClick={() => noteOnClick(i)}>
                <textarea className={NotesStyles.title} value={title === "" ? "Untitled Note" : title} readOnly></textarea>
                <textarea className={NotesStyles.note} value={note} readOnly></textarea>
            </button>;
            returnData.push(noteEntry);
        }
        return returnData;
    }

    function triggerRedirect() {
        if (redirect === 1) {
            return <Navigate to={"/pomodoro-timer"} replace/>;
        }
        else if (redirect === 2) {
            return <Navigate to={"/todo-list"} replace/>;
        }
        else if (redirect === 3) {
            return <Navigate to={"/notes"} replace/>;
        }
        return "";
    }


    return <div className={styles.mainStyle}>
        <div className={styles.pomodoroSpace + " " + (timerStarted ? styles.timerGoing : styles.timerNotGoing)} onClick={() => pomodoroSpaceOnClick()}>
            <p className={styles.timerTitle}>{loadTimerTitle()}</p>
            <p className={styles.timeRemaining}>{loadTimer(timeRemaining)}</p>
        </div>

        {((selectedTodoList as TodoListType).list.length >= 1) 
        ? 
            <div className={styles.todoSpace + " " + styles.todoSpaceWithTodos}>
                <input className={styles.todoListName} value={(selectedTodoList as TodoListType).name} readOnly/>
                <div className={styles.todoListArea}>
                    {loadTodosFromList()}
                </div>
            </div> 
        : 
            <div className={styles.todoSpace + " " + styles.todoSpaceWithOutTodos}>
                <p className={styles.noTodosMessage}> The selected todo List <span>{(selectedTodoList as TodoListType).name}</span> has no todos</p>
            </div>
        }



        {((notesData as NoteType[]).length >= 1)
        ?
            <div className={styles.noteSpace + " " + styles.hasNotes}>
                {loadNotes()}
            </div> 
        :
            <div className={styles.noteSpace + " " + styles.hasNoNotes}>
                <p className={styles.noNotesMessage}>There are no notes</p>
            </div>
        }

        {triggerRedirect()}
    </div>
}

export default Dashboard;