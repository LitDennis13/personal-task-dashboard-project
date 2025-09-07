import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchTodoListData, sendAddNewTodoList, sendUpdatedLoadedTodoList } from "../../../api/TodoListData/todoListData";

import type { TodoListType, TodoType } from "../../../types";


export function useTodoListData(): [TodoListType[], UseMutateAsyncFunction<void, Error, TodoListType, unknown>, UseMutateAsyncFunction<void, Error, void, unknown>, boolean, boolean] {
    const queryClient = useQueryClient();

    const { data: todoListData, isLoading: loadingTodoListData } = useQuery({
        queryKey: ["todoListData"],
        queryFn: () => fetchTodoListData(),
    });

    const { mutateAsync: updateLoadedTodoList, isSuccess: updateLoadedTodoListSucess } = useMutation({
        mutationFn: sendUpdatedLoadedTodoList,
    });

    const { mutateAsync: addNewTodoList, isSuccess: addNewTodoListSucess } = useMutation({
        mutationFn: sendAddNewTodoList,
    });
    

    useEffect(() => {
        if (updateLoadedTodoListSucess || addNewTodoListSucess) {
            queryClient.invalidateQueries({queryKey: ["todoListData"]});
        }

    }, [updateLoadedTodoListSucess, addNewTodoListSucess]);

    useEffect(() => {
        console.log(todoListData);
    }, [loadingTodoListData]);

    return [(todoListData as TodoListType[]), updateLoadedTodoList, addNewTodoList, loadingTodoListData, addNewTodoListSucess];
}


