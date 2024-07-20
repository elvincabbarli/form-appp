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
    singlePost: [],
    error: null,
    showMobile: false,
    commentNot: false,
    likeNot: false
};

const myToken = JSON.parse(localStorage.getItem('userInfo'));

export const fetchAllPosts = createAsyncThunk(
    "/fetchAllPosts",
    async () => {
        try {
            const response = await axios.get("http://195.35.56.202:8080/post", {
                headers: {
                    Authorization: `Bearer ${myToken.token}`,
                }
            });
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
        addCommentNot: (state) => {
            state.commentNot = true
        },
        addLikeNot: (state) => {
            state.likeNot = true
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
            console.log(action)
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

export const { postSuccess, changeMobile, singlePostSuccess, addCommentNot , addLikeNot } = postSlice.actions;

export default postSlice.reducer;
