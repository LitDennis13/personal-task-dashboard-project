import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchNoteData, sendAddNote, sendDeleteNote, sendSetNote, sendUpdateNotePositions } from "../../api/noteData";

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

    const { mutateAsync: addNote, isSuccess: addNoteSuccess } = useMutation({
        mutationFn: sendAddNote,
    });

    const { mutateAsync: deleteNote, isSuccess: deleteNoteSuccess } = useMutation({
        mutationFn: sendDeleteNote,
    });

    const { mutateAsync: updateNotePositions, isSuccess: updateNotePositionsSuccess } = useMutation({
        mutationFn: sendUpdateNotePositions,
    });
    

    useEffect(() => {
        let condition = setNoteSuccess || addNoteSuccess || deleteNoteSuccess || updateNotePositionsSuccess;
        if (condition) {
            queryClient.invalidateQueries({queryKey: ["noteData"]});
        }

    }, [setNoteSuccess, addNoteSuccess, deleteNoteSuccess, updateNotePositionsSuccess]);

    
    return {
        data: (noteData as NoteType[]),
        setNote,
        addNote,
        deleteNote,
        updateNotePositions,
        loadingNoteData,
    };
}