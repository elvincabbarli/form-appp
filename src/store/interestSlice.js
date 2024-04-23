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


const interestSlice = createSlice({
    name: "interests",
    initialState,
    reducers: {
        fetchPersonalInterests: (state, action) => {
            state.personalInterest = action.payload
        },
        fetchAllInterests: (state, action) => {
            state.interestAll = action.payload
        }
    }
});

export const { fetchPersonalInterests, fetchAllInterests } = interestSlice.actions;

export default interestSlice.reducer;