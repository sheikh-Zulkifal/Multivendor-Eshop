import { configureStore } from "@reduxjs/toolkit";

import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products : productReducer,
    events: eventReducer,
    cart:cartReducer,
  },
});
export default Store;
