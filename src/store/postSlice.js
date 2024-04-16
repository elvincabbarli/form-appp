// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to retrieve user data from local storage
// const getUserDataFromLocalStorage = () => {
//     const userData = localStorage.getItem('userInfo');
//     return userData ? JSON.parse(userData) : null;
// };

const initialState = {
    heading: '',
    content: '',
    category_name: '',
    category_id: '',
    isPosted: false,
};

// Get user data from local storage when the application starts
// const userDataFromLocalStorage = getUserDataFromLocalStorage();


// If user data exists in local storage, use it to initialize the state
// if (userDataFromLocalStorage) {
//     initialState.username = userDataFromLocalStorage.username;
//     initialState.lastName = userDataFromLocalStorage.last_name;
//     initialState.name = userDataFromLocalStorage.first_name;
//     initialState.email = userDataFromLocalStorage.email;
//     initialState.token = userDataFromLocalStorage.token;
//     initialState.isLoggedIn = true;
// }

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // postSuccess(state, action) {
        //     state.heading = action.payload.heading;
        //     state.content = action.payload.content;
        //     state.category_name = action.payload.category_name;
        //     state.category_id = action.category_id;
        //     state.isPosted = true;
        // },

        fetchPostsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        // logout(state) {
        //     state.username = '';
        //     state.token = '';
        //     state.isLoggedIn = false;
        //     localStorage.removeItem('userInfo');
        // },
    },

});

export const { postSuccess } = postSlice.actions;

export default postSlice.reducer;
