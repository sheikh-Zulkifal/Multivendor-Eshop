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
    .addCase("getAllEventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAllEventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete event of a shop
    .addCase("deleteEventRequest", (state)=>{
      state.isLoading = true
    })
    .addCase("deleteEventSuccess", (state,action)=>{
      state.isLoading = false
      state.message= action.payload
      
    })
    .addCase("deleteEventFailed", (state,action)=>{
      state.isLoading = false
      state.error= action.payload
      
    })
    
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});



