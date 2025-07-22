import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = React.useState(1);
  const [click, setClick] = React.useState(false);
  const [select, setSelect] = React.useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
  }, [data]);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const handleMessageSubmit = () => {
    navigate("inbox?conservationId=12345");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] md:w-[80%] `}>
          <div className="w-full py-5">
            <div className="block w-full md:flex">
              <div className="w-full md:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border " : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}> {data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  //   onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  {/* <Link to={`/shop/preview/${data?.shop._id}`}> */}
                  <img
                    src={data?.shop?.shop_avatar?.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  {/* </Link> */}
                  <div className="pr-8">
                    {/* <Link to={`/shop/preview/${data?.shop._id}`}> */}
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    {/*  </Link> */}
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = React.useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            aliquid corrupti adipisci quod suscipit, optio quas odit dolorem
            quam at consequatur repudiandae ea ducimus. Consequuntur id eos
            natus minima ipsam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam officia non vero corporis facere
            corrupti fugiat, possimus ut? Suscipit optio libero reprehenderit,
            assumenda ducimus neque distinctio facere harum eius fugit!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            aliquid corrupti adipisci quod suscipit, optio quas odit dolorem
            quam at consequatur repudiandae ea ducimus. Consequuntur id eos
            natus minima ipsam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam officia non vero corporis facere
            corrupti fugiat, possimus ut? Suscipit optio libero reprehenderit,
            assumenda ducimus neque distinctio facere harum eius fugit!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            aliquid corrupti adipisci quod suscipit, optio quas odit dolorem
            quam at consequatur repudiandae ea ducimus. Consequuntur id eos
            natus minima ipsam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam officia non vero corporis facere
            corrupti fugiat, possimus ut? Suscipit optio libero reprehenderit,
            assumenda ducimus neque distinctio facere harum eius fugit!
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex justify-center items-center">
          {/* flex-col  py-3 overflow-y-scroll */}
          <p>No reviews yet!</p>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis fugiat quisquam nesciunt esse exercitationem optio
              accusamus, culpa non minus odit. Reiciendis magni molestiae velit
              fugit suscipit, alias mollitia provident consectetur.
            </p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">15 July 2025</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">234</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
