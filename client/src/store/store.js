import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductReducer from "./admin/products-slice"
import shoppingProductsReducer from "./shopping/products-slice"
import shopCartSlice from "./shopping/cart-slice";
import shopAddressSlice from "./shopping/address-slice"
import shopOrderSlice from "./shopping/order-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shoppingProduct: shoppingProductsReducer,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder : shopOrderSlice
    }
})

export default store;