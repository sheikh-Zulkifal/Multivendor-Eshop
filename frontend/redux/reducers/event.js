import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // get all events
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAlleventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete event of a shop
    .addCase("deleteeventRequest", (state)=>{
      state.isLoading = true
    })
    .addCase("deleteeventSuccess", (state,action)=>{
      state.isLoading = false
      state.message= action.payload
      
    })
    .addCase("deleteeventFailed", (state,action)=>{
      state.isLoading = false
      state.error= action.payload
      
    })
    
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});



