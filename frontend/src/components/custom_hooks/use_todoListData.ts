import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchTodoListData, sendAddTodoList, sendSetTodoListName, sendDeleteTodoList, sendSwitchListIDs, sendAddTodo,
    sendSetTodoName, sendSetTodoNote, sendSetTodoCompletionStatus, sendDeleteTodo, sendUpdateTodoPosition } from "../../api/todoListData";

import type { TodoListType, TodoType } from "../../types";


export function useTodoListData(): [TodoListType[], UseMutateAsyncFunction<void, Error, number, unknown>, UseMutateAsyncFunction<void, Error, number, unknown>, UseMutateAsyncFunction<void, Error, number, unknown>, UseMutateAsyncFunction<void, Error, number, unknown>, UseMutateAsyncFunction<void, Error, number, unknown>, boolean] {
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
        mutationFn: sendDeleteTodoList,
    });

    const { mutateAsync: addTodo, isSuccess: switchAddTodo } = useMutation({
        mutationFn: sendAddTodo,
    });
    

    useEffect(() => {
        let condition = addTodoListSuccess || setTodoListNameSuccess || deleteTodoListSuccess 
        || switchListIDsSuccess || switchAddTodo;
        if (condition) {
            queryClient.invalidateQueries({queryKey: ["todoListData"]});
        }

    }, [addTodoListSuccess, setTodoListNameSuccess, switchListIDsSuccess, switchAddTodo]);

    return [(todoListData as TodoListType[]), addTodoList, setTodoListName, deleteTodoList, switchListIDs, addTodo, loadingTodoListData];
}