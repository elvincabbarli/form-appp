/* eslint-disable no-unused-vars */
import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    interestAll: [],
    personalInterest: [],
    loading: false,
};

const myToken = JSON.parse(localStorage.getItem('userInfo'))

export const fetchAllInterests = createAsyncThunk(
    "/fetchAllInterests",
    async () => {
        try {
            const response = await axios.get("https://fast-quora.onrender.com/category");
            const { data } = response;
            return data;

        } catch (error) {
            console.log(error);
            throw new error();
        }
    }
);




const interestSlice = createSlice({
    name: "interests",
    initialState,
    reducers: {
        fetchPersonalInterests: (state, action) => {
            state.personalInterest = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllInterests.fulfilled, (state, action) => {
            state.interestAll = action.payload;
            state.loading = false;
        });
    },
});

export const { fetchPersonalInterests } = interestSlice.actions;

export default interestSlice.reducer;