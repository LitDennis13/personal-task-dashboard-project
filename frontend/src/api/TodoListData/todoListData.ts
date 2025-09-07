import { fetchOptionsGet, fetchOptionsPOST, fetchOptionsPUT } from "../fetchOptions";

import type { TodoListType } from "../../types";

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

async function sendUpdatedLoadedTodoList(todoList: TodoListType) {
    await fetch("http://localhost:8080/api/v1/todo-list-data/update-loaded-todo-list", {
        ...fetchOptionsPUT,
        body: JSON.stringify(todoList),
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    }); 
}

async function sendAddNewTodoList() {
    await fetch("http://localhost:8080/api/v1/todo-list-data/add-new-todo-list", {
        ...fetchOptionsPOST,
    })
    .catch((error) => {
        console.error(error);
    });
}

export { fetchTodoListData, sendUpdatedLoadedTodoList, sendAddNewTodoList };