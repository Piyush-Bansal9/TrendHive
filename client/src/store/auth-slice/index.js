import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export const registerUser = createAsyncThunk('auth/register', 
    async(formData) => {
        const response = await axios.post("http://localhost:5000/api/auth/signup", formData, {
            headers: {
                'Content-Length': JSON.stringify(requestData).length // Calculate length of the body
            },
            withCredentials: true
        })
        return response.data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

    }
})

export const {setUserInfo} = authSlice.actions;
export default authSlice.reducer;