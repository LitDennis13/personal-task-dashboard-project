import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchNewID, sendIncrementNewID } from "../../../api/NewID/newID";


export function useNewID(): [number, UseMutateAsyncFunction<void, Error, void, unknown>] {
    const queryClient = useQueryClient();

    const { data: newID, } = useQuery({
        queryKey: ["newID"],
        queryFn: () => fetchNewID(),
    });

    const { mutateAsync: incrementNewID, isSuccess: incrementSucess } = useMutation({
        mutationFn: sendIncrementNewID,
    });
    

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ["newID"]});
        
    }, [incrementSucess]);

    return [(newID as number), incrementNewID];
}


