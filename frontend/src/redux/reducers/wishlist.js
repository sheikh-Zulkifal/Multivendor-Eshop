// wishlistReducer.js
import { createAction, createReducer } from "@reduxjs/toolkit";

// Correct action creators
export const addToWishlist = createAction("addToWishlist");
export const removeFromWishlist = createAction("removeFromWishlist");

// Initial state
const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

// Reducer
export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToWishlist, (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);

      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist.push(item);
      }
    })
    .addCase(removeFromWishlist, (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    });
});