import type { TodoListType } from "../types";
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

// sendSwitchListIDs(59, 60);

export { fetchTodoListData }