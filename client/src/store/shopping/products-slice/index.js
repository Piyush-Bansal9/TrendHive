import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    listOfProducts : [],
    productDetails: null
}

export const getProductDetails = createAsyncThunk('/products/getproductdetailss', 
    async(id) => {
        const response = await axios.get(`http://localhost:5000/api/shopping/products/get/${id}`);
        console.log(response);
        return response?.data;
    }
)

export const getAllFilteredProducts = createAsyncThunk('/products/getallfilteredproducts',
    async({filterParams, sortParams}) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })

        const result = await axios.get(`http://localhost:5000/api/shopping/products/get?${query}`);
        console.log(result);
        
        return result?.data;
    }
)

const ShoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails : (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFilteredProducts.pending, (state) => {
            state.isLoading =  true
        }).addCase(getAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload, 'data');
            
            state.isLoading = false
            state.listOfProducts = action.payload.data;
        }).addCase(getAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.listOfProducts = [];
        }).addCase(getProductDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null;
        });
    }
})

export const {setProductDetails} = ShoppingProductsSlice.actions;

export default ShoppingProductsSlice.reducer;