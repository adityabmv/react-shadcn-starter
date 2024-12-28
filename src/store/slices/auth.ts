import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { start } from 'repl';

enum UserRole{
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN'
}

interface User {
    userId: string;
    userName: string;
    email: string;
    role: UserRole;
}

enum AuthStatus {
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

interface AuthState {
    user: User | null;
    status: AuthStatus;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: AuthStatus.NOT_AUTHENTICATED,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.status = AuthStatus.SUCCESS;
        },
        logout(state) {
            state.user = null;
            state.status = AuthStatus.NOT_AUTHENTICATED;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.status = AuthStatus.FAILED;
        },
    },
});


export const { setUser, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;

