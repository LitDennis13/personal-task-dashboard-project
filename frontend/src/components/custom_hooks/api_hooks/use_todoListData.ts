import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchTodoListData, sendUpdatedLoadedTodoList } from "../../../api/TodoListData/todoListData";

import type { TodoListType, TodoType } from "../../../types";


export function useTodoListData(): [TodoListType[], UseMutateAsyncFunction<void, Error, TodoListType, unknown>, boolean] {
    const queryClient = useQueryClient();

    const { data: todoListData, isLoading: loadingTodoListData } = useQuery({
        queryKey: ["todoListData"],
        queryFn: () => fetchTodoListData(),
    });

    const { mutateAsync: updateLoadedTodoList, isSuccess: updateLoadedTodoListSucess } = useMutation({
        mutationFn: sendUpdatedLoadedTodoList,
    });
    

    // useEffect(() => {
    //     queryClient.invalidateQueries({queryKey: ["todoListData"]});
        
    // }, [incrementSucess]);

    return [(todoListData as TodoListType[]), updateLoadedTodoList, loadingTodoListData];
}


