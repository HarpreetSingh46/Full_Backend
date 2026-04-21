import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    total: 0,
    totalItems: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [],
      
    },
    reducers: {
        setItem: (state, action) => {
            state.items = action.payload;
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }   
            state.total += item.price;
            state.totalItems++;
        },
        removeFromCart: (state, action) => {
            state.items.pop(action.payload);
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity--;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            state.total -= item.price;
            state.totalItems--;
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.totalItems = 0;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            state.total += item.price;
            state.totalItems++;
        },
        removeItem: (state, action) => {
            state.items.pop(action.payload);
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity--;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            state.total -= item.price;
            state.totalItems--;
        },
    },
});

export const { addToCart, removeFromCart, clearCart , setItem,addItem} = cartSlice.actions;
export default cartSlice.reducer;
