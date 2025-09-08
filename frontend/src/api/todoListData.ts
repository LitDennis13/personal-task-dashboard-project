import type { TodoListType } from "../types";
import { fetchOptionsGet } from "./fetchOptions";

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

export { fetchTodoListData }