import {
    createAsyncThunk,
    createSlice,
    isPending,
    isRejected,
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


export const fetchPersonalInterests = createAsyncThunk(
    "/fetchPersonalInterests",
    async () => {
        try {
            const response = await axios.get("https://fast-quora.onrender.com/users/me", {
                headers: {
                    Authorization: `Bearer ${myToken.token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response;
            return Object.values(data.data.interest)

        } catch (error) {
            console.log(error);
            throw new error();
        }
    }
);

const interestSlice = createSlice({
    name: "interests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllInterests.fulfilled, (state, action) => {
            state.interestAll = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPersonalInterests.fulfilled, (state, action) => {
            state.personalInterest = action.payload;
            state.loading = false;
        });
        builder.addMatcher(isPending(fetchAllInterests, fetchPersonalInterests), (state) => {
            state.loading = true;
        });

        builder.addMatcher(isRejected(fetchAllInterests, fetchPersonalInterests), (state) => {
            state.loading = false;
        });
    },
});

export const { postSuccess } = interestSlice.actions;

export default interestSlice.reducer;