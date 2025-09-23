import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient, type UseMutateAsyncFunction } from "@tanstack/react-query";

import { fetchNoteData, sendSetNote } from "../../api/noteData";

import type { NoteType } from "../../types";


export function useNoteData() {
    const queryClient = useQueryClient();

    const { data: noteData, isLoading: loadingNoteData } = useQuery({
        queryKey: ["noteData"],
        queryFn: () => fetchNoteData(),
    });

    const { mutateAsync: setNote, isSuccess: setNoteSuccess } = useMutation({
        mutationFn: sendSetNote,
    });
    

    useEffect(() => {
        let condition = setNoteSuccess;
        if (condition) {
            queryClient.invalidateQueries({queryKey: ["noteData"]});
        }

    }, [setNoteSuccess]);

    
    return {
        data: (noteData as NoteType[]),
        setNote,
        loadingNoteData
    };
}