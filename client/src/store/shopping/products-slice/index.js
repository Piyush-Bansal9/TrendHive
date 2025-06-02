import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    listOfProducts : []
}

export const getAllFilteredProducts = createAsyncThunk('/products/getallfilteredproducts',
    async() => {
        const result = await axios.get('http://localhost:5000/api/shopping/products/get');
        console.log(result);
        
        return result?.data;
    }
)

const ShoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllFilteredProducts.pending, (state) => {
            state.isLoading =  true
        }).addCase(getAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload, 'data');
            
            state.isLoading = false
            state.listOfProducts = action.payload.data;
        }).addCase(getAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.listOfProducts = []
        })
    }
})

export default ShoppingProductsSlice.reducer;