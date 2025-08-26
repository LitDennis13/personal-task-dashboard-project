import { configureStore } from "@reduxjs/toolkit";
import timerHasStartedReducer from "./timer_has_started/timerHasStarted";
import newIDReducer from "./new_id/newID";

export const store = configureStore({
    reducer: {
        timerHasStarted: timerHasStartedReducer,
        newID: newIDReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;