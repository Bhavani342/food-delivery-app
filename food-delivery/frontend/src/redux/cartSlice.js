import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    restaurantName: ""
  },
  reducers: {
    addItem: (state, action) => {
      const { item, restaurantName } = action.payload;
      if (state.restaurantName && state.restaurantName !== restaurantName) {
        state.items = [];
        state.total = 0;
      }
      state.restaurantName = restaurantName;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total += item.price;
    },
    removeItem: (state, action) => {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        if (existing.quantity === 1) {
          state.items = state.items.filter((i) => i._id !== action.payload._id);
        } else {
          existing.quantity -= 1;
        }
        state.total -= action.payload.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurantName = "";
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
