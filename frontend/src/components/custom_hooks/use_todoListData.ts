import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchTodoListData, sendAddTodoList, sendSetTodoListName, sendDeleteTodoList, sendSwitchListIDs, sendAddTodo,
    sendSetTodoName, sendSetTodoNote, sendSetTodoCompletionStatus, sendDeleteTodo, sendUpdateTodoPosition, } from "../../api/todoListData";

import type { AddTodoListData, SetTodoListNameData, DeleteTodoListData, SwitchListsIDsData, AddTodoData,
     SetTodoNameData, SetTodoNoteData, SetTodoCompletionStatusData, DeleteTodoData, UpdateTodoPositionData } from "../../api/todoListData";

import type { TodoListType, TodoType } from "../../types";


export function useTodoListData(): [TodoListType[], UseMutateAsyncFunction<void, Error, AddTodoListData, unknown>, UseMutateAsyncFunction<void, Error, SetTodoListNameData, unknown>, UseMutateAsyncFunction<void, Error, DeleteTodoListData, unknown>, UseMutateAsyncFunction<void, Error, SwitchListsIDsData, unknown>, UseMutateAsyncFunction<void, Error, AddTodoData, unknown>, UseMutateAsyncFunction<void, Error, SetTodoNameData, unknown>, UseMutateAsyncFunction<void, Error, SetTodoNoteData, unknown>, UseMutateAsyncFunction<void, Error, SetTodoCompletionStatusData, unknown>, UseMutateAsyncFunction<void, Error, DeleteTodoData, unknown>, UseMutateAsyncFunction<void, Error, UpdateTodoPositionData, unknown>, boolean] {
    const queryClient = useQueryClient();

    const { data: todoListData, isLoading: loadingTodoListData } = useQuery({
        queryKey: ["todoListData"],
        queryFn: () => fetchTodoListData(),
    });

    const { mutateAsync: addTodoList, isSuccess: addTodoListSuccess } = useMutation({
        mutationFn: sendAddTodoList,
    });

    const { mutateAsync: setTodoListName, isSuccess: setTodoListNameSuccess } = useMutation({
        mutationFn: sendSetTodoListName,
    });

    const { mutateAsync: deleteTodoList, isSuccess: deleteTodoListSuccess } = useMutation({
        mutationFn: sendDeleteTodoList,
    });

    const { mutateAsync: switchListIDs, isSuccess: switchListIDsSuccess } = useMutation({
        mutationFn: sendSwitchListIDs,
    });

    const { mutateAsync: addTodo, isSuccess: addTodoSuccess } = useMutation({
        mutationFn: sendAddTodo,
    });

    const { mutateAsync: setTodoName, isSuccess: setTodoNameSuccess } = useMutation({
        mutationFn: sendSetTodoName,
    });

    const { mutateAsync: setTodoNote, isSuccess: setTodoNoteSuccess } = useMutation({
        mutationFn: sendSetTodoNote,
    });

    const { mutateAsync: setTodoCompletionStatus, isSuccess: setTodoCompletionStatusSuccess } = useMutation({
        mutationFn: sendSetTodoCompletionStatus,
    });
    
    const { mutateAsync: deleteTodo, isSuccess: deleteTodoSuccess } = useMutation({
        mutationFn: sendDeleteTodo,
    });

    const { mutateAsync: updateTodoPosition, isSuccess: updateTodoPositionSuccess } = useMutation({
        mutationFn: sendUpdateTodoPosition,
    });
    

    useEffect(() => {
        let condition = addTodoListSuccess || setTodoListNameSuccess || deleteTodoListSuccess 
        || switchListIDsSuccess || addTodoSuccess || setTodoNameSuccess || setTodoNoteSuccess
        || setTodoCompletionStatusSuccess || deleteTodoSuccess || updateTodoPositionSuccess;
        if (condition) {
            queryClient.invalidateQueries({queryKey: ["todoListData"]});
        }

    }, [addTodoListSuccess, setTodoListNameSuccess, deleteTodoListSuccess, switchListIDsSuccess, addTodoSuccess, setTodoNameSuccess,
         setTodoNoteSuccess, setTodoCompletionStatusSuccess, deleteTodoSuccess, updateTodoPositionSuccess]);

    return [(todoListData as TodoListType[]), addTodoList, setTodoListName, deleteTodoList, switchListIDs, addTodo, setTodoName, setTodoNote, setTodoCompletionStatus, deleteTodo, updateTodoPosition, loadingTodoListData];
}