import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=20')
        return response.data.products
    }
    catch (error) {
        console.log(error)
    }
})

export { fetchProducts }