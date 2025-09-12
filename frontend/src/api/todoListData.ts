import type { TodoListType, TodoType } from "../types";
import { fetchOptionsGet, fetchOptionsPOST, fetchOptionsPUT } from "./fetchOptions";

async function fetchTodoListData() {
    const returnValue = await fetch("http://localhost:8080/api/v1/todo-list-data/get-todo-list-data", fetchOptionsGet)
    .then((response) => response.json())
    .then((data: TodoListType[]) => {
        return data;
    })
    .catch((error) => {
        console.error(error);
    });

    return returnValue;
}

async function sendAddTodoList(listID: number) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/add-todo-list", {
        ...fetchOptionsPUT,
        body: JSON.stringify(listID),
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendSetTodoListName(listID: number, newName: string) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-list-name", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, newName})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendDeleteTodoList(listID: number) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/delete-todo-list", {
        ...fetchOptionsPUT,
        body: JSON.stringify(listID)
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendSwitchListIDs(listIDOne: number, listIDTwo: number) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/switch-todo-list-ids", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listIDOne, listIDTwo})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendAddTodo(listID: number, newTodo: TodoType) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/add-todo", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, newTodo})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendSetTodoName(listID: number, todoID: number, newTodoName: string) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-name", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, newTodoName})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendSetTodoNote(listID: number, todoID: number, newTodoNote: string) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-note", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, newTodoNote})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendSetTodoCompletionStatus(listID: number, todoID: number, status: boolean) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-completion-status", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, status})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendDeleteTodo(listID: number, todoID: number) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/delete-todo", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID})
    })
    .catch((error) => {
        console.error(error);
    });
}

async function sendUpdateTodoPosition(listID: number, oldTodoID: number, newTodoID: number) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/update-todo-position", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, oldTodoID, newTodoID})
    })
    .catch((error) => {
        console.error(error);
    });
}







export { fetchTodoListData, sendAddTodoList, sendSetTodoListName, sendDeleteTodoList,
    sendSwitchListIDs, sendAddTodo, sendSetTodoName, sendSetTodoNote,
    sendSetTodoCompletionStatus, sendDeleteTodo, sendUpdateTodoPosition }