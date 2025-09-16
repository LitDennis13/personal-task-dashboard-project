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
    // console.log("got data");
    return returnValue;
}


type AddTodoListData = {
    listID: number;
};
async function sendAddTodoList(data: AddTodoListData) {
    const listID = data.listID;

    await fetch("http://localhost:8080/api/v1/todo-list-data/add-todo-list", {
        ...fetchOptionsPUT,
        body: JSON.stringify(listID),
    })
    .catch((error) => {
        console.error(error);
    });
}


type SetTodoListNameData = {
    listID: number;
    newName: string;
};
async function sendSetTodoListName(data: SetTodoListNameData) {
    const listID = data.listID;
    const newName = data.newName;

    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-list-name", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, newName})
    })
    .catch((error) => {
        console.error(error);
    });
}


type DeleteTodoListData = {
    listID: number;
};
async function sendDeleteTodoList(data: DeleteTodoListData) {
    const listID = data.listID;

    await fetch("http://localhost:8080/api/v1/todo-list-data/delete-todo-list", {
        ...fetchOptionsPUT,
        body: JSON.stringify(listID)
    })
    .catch((error) => {
        console.error(error);
    });
}


type SwitchListsIDsData = {
    listIDOne: number;
    listIDTwo: number;
};
async function sendSwitchListIDs(data: SwitchListsIDsData) {
    const listIDOne = data.listIDOne;
    const listIDTwo = data.listIDTwo;

    await fetch("http://localhost:8080/api/v1/todo-list-data/switch-todo-list-ids", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listIDOne, listIDTwo})
    })
    .catch((error) => {
        console.error(error);
    });
}


type AddTodoData = {
    listID: number;
    newTodo: TodoType;
};
async function sendAddTodo(data: AddTodoData) {
    const listID = data.listID;
    const newTodo = data.newTodo;

    await fetch("http://localhost:8080/api/v1/todo-list-data/add-todo", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, newTodo})
    })
    .catch((error) => {
        console.error(error);
    });
}


type SetTodoNameData = {
    listID: number;
    todoID: number;
    newTodoName: string;
};
async function sendSetTodoName(data: SetTodoNameData) {
    const listID = data.listID;
    const todoID = data.todoID;
    const newTodoName = data.newTodoName;

    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-name", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, newTodoName})
    })
    .catch((error) => {
        console.error(error);
    });
}


type SetTodoNoteData = {
    listID: number;
    todoID: number;
    newTodoNote: string;
};
async function sendSetTodoNote(data: SetTodoNoteData) {
    const listID = data.listID;
    const todoID = data.todoID;
    const newTodoNote = data.newTodoNote;

    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-note", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, newTodoNote})
    })
    .catch((error) => {
        console.error(error);
    });
}


type SetTodoCompletionStatusData = {
    listID: number;
    todoID: number;
    status: boolean;
};
async function sendSetTodoCompletionStatus(data: SetTodoCompletionStatusData) {
    const listID = data.listID;
    const todoID = data.todoID;
    const status = data.status;

    await fetch("http://localhost:8080/api/v1/todo-list-data/set-todo-completion-status", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID, status})
    })
    .catch((error) => {
        console.error(error);
    });
}


type DeleteTodoData = {
    listID: number;
    todoID: number;
};
async function sendDeleteTodo(data: DeleteTodoData) {
    const listID = data.listID;
    const todoID = data.todoID;

    await fetch("http://localhost:8080/api/v1/todo-list-data/delete-todo", {
        ...fetchOptionsPUT,
        body: JSON.stringify({listID, todoID})
    })
    .catch((error) => {
        console.error(error);
    });
}


type UpdateTodoPositionData = {
    listID: number;
    oldTodoID: number;
    newTodoID: number;
};
async function sendUpdateTodoPosition(data: UpdateTodoPositionData) {
    const listID = data.listID;
    const oldTodoID = data.oldTodoID;
    const newTodoID = data.newTodoID;

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
    sendSetTodoCompletionStatus, sendDeleteTodo, sendUpdateTodoPosition };

export type { AddTodoListData, SetTodoListNameData, DeleteTodoListData, SwitchListsIDsData, AddTodoData,
     SetTodoNameData, SetTodoNoteData, SetTodoCompletionStatusData, DeleteTodoData, UpdateTodoPositionData };