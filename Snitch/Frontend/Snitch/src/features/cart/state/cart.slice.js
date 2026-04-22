import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    total: 0,
    totalItems: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    totalItems: 0,
  },

  reducers: {
    addTheItem: (state, action) => {
      const newItem = action.payload;

      const existing = state.items.find(
        item =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      state.totalItems += newItem.quantity || 1;
      state.total += newItem.price * (newItem.quantity || 1);
    },

    removeItem: (state, action) => {
      const { productId, variantId } = action.payload;

      const existing = state.items.find(
        item =>
          item.productId === productId &&
          item.variantId === variantId
      );

      if (existing) {
        state.totalItems -= existing.quantity;
        state.total -= existing.price * existing.quantity;

        state.items = state.items.filter(
          item =>
            !(item.productId === productId && item.variantId === variantId)
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
    },
  },
});

export const { addTheItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
