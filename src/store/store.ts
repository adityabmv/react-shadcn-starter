import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import courseViewSlice from "./slices/courseViewSlice";
import {courseApi} from "./services/courseServceApi";
import listenerMiddleware from "./middleware/listenerMiddleware";
import { coreApi } from "./services/coreApi";
import { activityApi } from "./services/activityApi";

const store = configureStore({
    reducer: {
        auth: authSlice,
        courseView: courseViewSlice,
        [courseApi.reducerPath]:courseApi.reducer,
        [coreApi.reducerPath]: coreApi.reducer,
        [activityApi.reducerPath]: activityApi.reducer,
    
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([courseApi.middleware,coreApi.middleware, activityApi.middleware,listenerMiddleware.middleware]);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

