import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import courseViewSlice from "./slices/courseViewSlice";
import {courseApi} from "./services/courseServceApi";
import listenerMiddleware from "./middleware/listenerMiddleware";

const store = configureStore({
    reducer: {
        auth: authSlice,
        courseView: courseViewSlice,
        [courseApi.reducerPath]:courseApi.reducer
    
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([courseApi.middleware,listenerMiddleware.middleware]);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
