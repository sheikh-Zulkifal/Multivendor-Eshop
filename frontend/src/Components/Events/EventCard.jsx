import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import getImageUrl from "../../utils/getImageUrl.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex p-4 mb-12 ${
        active ? "unset" : "mb-12"
      }`}
    >
      {/* Left Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={getImageUrl(data?.images[0])}
          alt={data.name}
          className="max-h-[300px] w-auto object-contain rounded-md"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-0 lg:pl-6">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-gray-700">{data.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-medium text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>

        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
