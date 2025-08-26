import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TimerHasStartedState {
    value: boolean;
}

const initialState: TimerHasStartedState = {
    value: false,
};

const timerHasStartedSlice = createSlice({
    name: "timer_has_started",
    initialState,
    reducers: {
        setTimerHasStarted: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});


export const { setTimerHasStarted } = timerHasStartedSlice.actions;
export default timerHasStartedSlice.reducer;