import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartTotal: 0
    },
    reducers: {
        addToCart(state, action) {
            const newItemId = action.payload.id
            const existingItem = state.cart.find(item => item.id === newItemId)

            if (!existingItem) {
                state.cart.push(action.payload)
                toast.success('Added to Cart')
            }
        },        
        incrementQuantity(state, action) {
            const itemId = action.payload.id;
            const item = state.cart.find(item => item.id === itemId);
            if (item && item.quantity < 10) {
                item.quantity += 1;
                item.total += item.price
            }
        },
        decrementQuantity(state, action) {
            const itemId = action.payload.id;
            const item = state.cart.find(item => item.id === itemId);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        changeQuantity(state, action) {
            const { id, newQuantity } = action.payload;
            const item = state.cart.find(item => item.id === id);

            if (item) {
                item.quantity = newQuantity || 1;
            }
        },
        removeItem(state, action) {
            const itemId = action.payload.id;
            state.cart = state.cart.filter((item => item.id !== itemId))
            toast.error('Product Removed')
        },
        totalPrice(state) {
            let cartTotalPrice = 0
            state.cart.forEach((item) => {
                cartTotalPrice += item.price * item.quantity
            })
            state.cartTotal = cartTotalPrice
        },
        emptyCart(state) {
            state.cart = []
        }
    }
})

export const { addToCart, incrementQuantity, decrementQuantity, changeQuantity, removeItem, totalPrice, emptyCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer