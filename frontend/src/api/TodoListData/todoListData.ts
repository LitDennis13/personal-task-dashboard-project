import { fetchOptionsGet, fetchOptionsPUT } from "../fetchOptions";

import type { TodoListType } from "../../types";

async function fetchTodoListData() {
    const returnValue = await fetch("http://localhost:8080/api/v1/todo-list-data/getTodoListData", fetchOptionsGet)
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
    await fetch("http://localhost:8080/api/v1/todo-list-data/updateLoadedTodoList", {
        ...fetchOptionsPUT,
        body: JSON.stringify(todoList),
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    }); 
}

export { fetchTodoListData, sendUpdatedLoadedTodoList };