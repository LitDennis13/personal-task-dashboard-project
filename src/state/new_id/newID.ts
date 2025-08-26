import { createSlice } from "@reduxjs/toolkit";

interface NewIDState {
    value: number;
}

const initialState: NewIDState = {
    value: 1,
};

const newIDSlice = createSlice({
    name: "timer_has_started",
    initialState,
    reducers: {
        incrementNewID: (state) => {
            state.value += 1;
        }
    },
});


export const { incrementNewID } = newIDSlice.actions;
export default newIDSlice.reducer;