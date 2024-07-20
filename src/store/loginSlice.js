// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to retrieve user data from local storage
const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('userInfo');
    return userData ? JSON.parse(userData) : null;
};

const initialState = {
    username: '',
    lastName: '',
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
    user_id: ''
};

// Get user data from local storage when the application starts
const userDataFromLocalStorage = getUserDataFromLocalStorage();


// If user data exists in local storage, use it to initialize the state
if (userDataFromLocalStorage) {
    initialState.username = userDataFromLocalStorage.username;
    initialState.lastName = userDataFromLocalStorage.last_name;
    initialState.name = userDataFromLocalStorage.first_name;
    initialState.email = userDataFromLocalStorage.email;
    initialState.token = userDataFromLocalStorage.token;
    initialState.user_id = userDataFromLocalStorage.user_id;
    initialState.isLoggedIn = true;
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.username = action.payload.username;
            state.lastName = action.payload.last_name;
            state.name = action.payload.first_name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
            state.isLoggedIn = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout(state) {
            state.username = '';
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
