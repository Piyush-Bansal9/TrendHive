import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { act } from "react";

const initialState = {
    isLoading: false,
    listOfProducts: []
}
export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async(formData) => {
        const repsonse = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
            headers : {
                'Content-Type': 'application/json'
            }
        });
        return repsonse?.data;
    }
)
export const getAllProducts = createAsyncThunk('/products/getallproducts',
    async() => {
        const repsonse = await axios.get('http://localhost:5000/api/admin/products/get');
        return repsonse?.data;
    }
)

export const editProduct = createAsyncThunk('/products/editproduct',
    async({id, formData}) => {
        const repsonse = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
            headers : {
                'Content-Type': 'application/json'
            }
        });
        return repsonse?.data;
    }
)

export const deleteProduct = createAsyncThunk('/products/deleteproduct',
    async(id) => {
        const repsonse = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        return repsonse?.data;
    }
)


const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listOfProducts = action.payload.data;
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.listOfProducts = [];
        });
    }
})


export default AdminProductsSlice.reducer;