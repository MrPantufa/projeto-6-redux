import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, { payload }) => {
      // payload: { img, title, description, serve, priceNumber, priceText }
      state.items.push(payload);
    },
    removeItem: (state, { payload }) => {
      // payload: índice do item
      state.items.splice(payload, 1);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

// Exporte normal (caso queira usar action creators em outros lugares)
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Exporte os TYPES oficiais (usaremos no componente para despachar com segurança)
export const CART_ADD = addItem.type;       // "cart/addItem"
export const CART_REMOVE = removeItem.type; // "cart/removeItem"

export default cartSlice.reducer;
