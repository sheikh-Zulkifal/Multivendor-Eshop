export const addToCart = (data) => async (dispatch, getState) => {
  console.log("This is Rich Aqib");
  
  dispatch({
    type: "addToCart",
    payload: data,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart) || []);
  return data;
};

// removeFromCart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
