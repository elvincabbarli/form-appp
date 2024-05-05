/* eslint-disable no-unused-vars */
import {
    createAsyncThunk,
    createSlice,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";


// Function to load liked comments from localStorage
const loadLikedComments = () => {
    const likedComments = localStorage.getItem("likedComments");
    return likedComments ? JSON.parse(likedComments) : [];
};

// Function to load liked post from localStorage
const loadLikedPost = () => {
    const likedPost = localStorage.getItem("likedPost");
    return likedPost ? likedPost : null;
};

const initialState = {
    postsAll: [],
    personalPosts: [],
    isPosted: false,
    loading: false,
    singlePost: [],
    likedComments: loadLikedComments(), 
    likedPost: loadLikedPost(), 
    error: null, 
    showMobile: false
};

const myToken = JSON.parse(localStorage.getItem('userInfo'));

export const fetchAllPosts = createAsyncThunk(
    "/fetchAllPosts",
    async () => {
        try {
            const response = await axios.get("https://fast-quora.onrender.com/posts");
            const { data } = response;
            return data;

        } catch (error) {
            console.log(error);
            throw new Error(error.message); 
        }
    }
);


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postSuccess: (state, action) => {
            state.personalPosts = action.payload
        },
        changeMobile: (state, action) => {
            state.showMobile = action.payload
        },
        singlePostSuccess: (state, action) => {
            state.singlePost = action.payload
        },
        addLikedComment: (state, action) => {
            const likedId = action.payload;
            if (!state.likedComments.includes(likedId)) {
                state.likedComments.push(likedId);
                // Update localStorage with the new liked comment
                localStorage.setItem("likedComments", JSON.stringify(state.likedComments));
            }
        },
        addLikedPost: (state, action) => {
            const postId = action.payload;
            state.likedPost = postId;
            // Update localStorage with the liked post ID
            localStorage.setItem("likedPost", postId);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.postsAll = action.payload;
            state.loading = false;
        });



        builder.addMatcher(isPending(fetchAllPosts), (state) => {
            state.loading = true;
        });

        builder.addMatcher(isRejected(fetchAllPosts), (state) => {
            state.loading = false;
        });
    },
});

export const { postSuccess, changeMobile, singlePostSuccess, addLikedComment, addLikedPost } = postSlice.actions;

export default postSlice.reducer;
