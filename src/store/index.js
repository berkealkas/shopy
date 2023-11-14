import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { cartReducer } from "./slices/cartSlice";
import { modalReducer } from "./slices/modalSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        modal: modalReducer,
    }
})

export * from './thunks/fetchProducts'