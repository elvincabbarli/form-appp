// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    token: '',
    isLoggedIn: false,
};



const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.username = '';
            state.token = '';
            state.isLoggedIn = false;
        },
    },
});

export const { loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
