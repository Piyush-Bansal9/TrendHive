import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductReducer from "./admin/products-slice"
import shoppingProductsReducer from "./shopping/products-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shoppingProduct: shoppingProductsReducer
    }
})

export default store;