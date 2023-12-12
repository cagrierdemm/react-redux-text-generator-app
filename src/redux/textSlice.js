import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchText = createAsyncThunk('text/getText', async (paras, format) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/?type=all-meat&paras=${paras}&format=${format}`);
    return res.data;
})

export const textSlice = createSlice({
    name: 'text',
    initialState: {
        text: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchText.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchText.fulfilled, (state, action) => {
                state.text = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchText.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default textSlice.reducer;