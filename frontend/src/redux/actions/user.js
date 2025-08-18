import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateUserInformation =
  (name, email, password, phoneNumber) => async (dispatch, action) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Update user address
export const updateUserAddress =
  (country, city, zipCode, address1, address2, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          zipCode,
          address1,
          address2,
          addressType,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: {
          successMessage: "User address updated Successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Delete User Address

  export const deleteUserAddress = (id) => async(dispatch)=>{
    try {
      dispatch({
        type: "DeleteUserAddressRequest",
      });
      const { data } = await axios.delete(
        `${server}/user/delete-user-address/${id}`,
        { withCredentials: true }
      );
      dispatch({
        type: "DeleteUserAddressSuccess",
        payload: {
          successMessage: "User address deleted Successfully!",
          user: data.user,
        },
      });
      
    }  catch (error) {
      dispatch({
        type: "DeleteUserAddressFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
