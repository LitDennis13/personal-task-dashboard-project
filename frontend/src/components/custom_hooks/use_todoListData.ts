import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchTodoListData } from "../../api/todoListData";

import type { TodoListType, TodoType } from "../../types";


export function useTodoListData(): [TodoListType[], boolean] {
    const queryClient = useQueryClient();

    const { data: todoListData, isLoading: loadingTodoListData } = useQuery({
        queryKey: ["todoListData"],
        queryFn: () => fetchTodoListData(),
    });

    // const { mutateAsync: updateLoadedTodoList, isSuccess: updateLoadedTodoListSucess } = useMutation({
    //     mutationFn: sendUpdatedLoadedTodoList,
    // });

    

    // useEffect(() => {
    //     if (updateLoadedTodoListSucess) {
    //         queryClient.invalidateQueries({queryKey: ["todoListData"]});
    //     }

    // }, [updateLoadedTodoListSucess]);

    return [(todoListData as TodoListType[]), loadingTodoListData];
}