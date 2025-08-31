import axios from "axios";
import { server } from "../../server";

// get all order of user
export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
      { withCredentials: true }
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
   } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};
