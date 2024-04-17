import {
    createAsyncThunk,
    createSlice,
    isPending,
    isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    postsAll: [],
    personalPosts: [],
    isPosted: false,
    loading: false,
    error: null, // Add error state
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
            throw new Error(error.message); // Throw error properly
        }
    }
);


export const fetchPersonalPosts = createAsyncThunk(
    "/fetchPersonalPosts",
    async () => {
        try {
            const response = await axios.get("https://fast-quora.onrender.com/post", {
                headers: {
                    Authorization: `Bearer ${myToken.token}`,
                    "Content-Type": "application/json",
                },
            });
            const { data } = response;
            return data;

        } catch (error) {
            console.log(error);
            throw new Error(error.message); // Throw error properly
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            await axios.delete('https://fast-quora.onrender.com/post', {
                data: { post_id: postId },
                headers: {
                    Authorization: `Bearer ${myToken.token}`,
                    "Content-Type": "application/json",
                }
            });
            return postId;
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle error properly
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.postsAll = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPersonalPosts.fulfilled, (state, action) => {
            state.personalPosts = action.payload;
            state.loading = false;
        });

        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            // Remove the deleted post from the state
            state.personalPosts = state.personalPosts.filter(
                (post) => post.id !== action.payload
            );
            state.loading = false;
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        builder.addMatcher(isPending(fetchAllPosts, fetchPersonalPosts), (state) => {
            state.loading = true;
        });

        builder.addMatcher(isRejected(fetchAllPosts, fetchPersonalPosts), (state) => {
            state.loading = false;
        });
    },
});

export const { postSuccess } = postSlice.actions;

export default postSlice.reducer;
