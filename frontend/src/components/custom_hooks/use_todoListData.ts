import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchTodoListData, sendAddTodoList, sendSetTodoListName, sendDeleteTodoList, sendSwitchListIDs, sendAddTodo,
    sendSetTodoName, sendSetTodoNote, sendSetTodoCompletionStatus, sendDeleteTodo, sendUpdateTodoPositions, } from "../../api/todoListData";

import type { TodoListType } from "../../types";


export function useTodoListData() {
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

    const { mutateAsync: updateTodoPositions, isSuccess: updateTodoPositionsSuccess } = useMutation({
        mutationFn: sendUpdateTodoPositions,
    });
    

    useEffect(() => {
        let condition = addTodoListSuccess || setTodoListNameSuccess || deleteTodoListSuccess 
        || switchListIDsSuccess || addTodoSuccess || setTodoNameSuccess || setTodoNoteSuccess
        || setTodoCompletionStatusSuccess || deleteTodoSuccess || updateTodoPositionsSuccess;
        if (condition) {
            queryClient.invalidateQueries({queryKey: ["todoListData"]});
        }

    }, [addTodoListSuccess, setTodoListNameSuccess, deleteTodoListSuccess, switchListIDsSuccess, addTodoSuccess, setTodoNameSuccess,
         setTodoNoteSuccess, setTodoCompletionStatusSuccess, deleteTodoSuccess, updateTodoPositionsSuccess]);

    
    return {
        data: (todoListData as TodoListType[]),
        addTodoList,
        setTodoListName,
        deleteTodoList,
        switchListIDs,
        addTodo,
        setTodoName,
        setTodoNote,
        setTodoCompletionStatus,
        deleteTodo,
        updateTodoPositions,
        loadingTodoListData,
    };
}