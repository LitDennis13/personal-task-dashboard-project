import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchNewID, sendIncrementNewID } from "../../api/newID";


export function useNewID() {
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

    return {
        data: (newID as number), 
        incrementNewID,
    };
}
