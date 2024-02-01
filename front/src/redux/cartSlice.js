import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  quantities: {},
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.quantities[action.payload.id] += 1;
      } else {
        state.items.push(action.payload);
        state.quantities[action.payload.id] = 1;
      }
      state.totalItems += 1;
    },
    removeItem: (state, action) => {
      if (state.quantities[action.payload] > 1) {
        state.quantities[action.payload] -= 1;
      } else {
        delete state.quantities[action.payload];
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      state.totalItems -= 1;
    },
    removeItemCompletely: (state, action) => {
      const quantity = state.quantities[action.payload];
      delete state.quantities[action.payload];
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems -= quantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.quantities = {};
      state.totalItems = 0;
    },
  },
});

export const { addItem, removeItem, removeItemCompletely, clearCart } =
  cartSlice.actions;

export const cartSelector = createSelector(
  (state) => state.cart,
  (cartState) =>
    cartState.items.map((item) => ({
      ...item,
      quantity: cartState.quantities[item.id],
    }))
);

export default cartSlice.reducer;
