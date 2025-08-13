import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    })
    // update user information
    .addCase("UpdateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("UpdateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // update user address
    .addCase("UpdateUserAddressRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateUserAddressSuccess", (state, action) => {
      state.loading = false;
      state.updateAddressSuccessMessage = action.payload;
      state.user = action.payload.user;
    })
    .addCase("UpdateUserAddressFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
