import React, { useEffect, useState } from "react";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import ProductDetails from "../Components/Products/ProductDetails.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx";
import { getAllProducts } from "../redux/actions/product"; // If you have this action

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (eventData != null) {
      const data = allEvents && allEvents.find((item) => item._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((item) => item._id === id);
      setData(data);
    }
  }, [data, allProducts, allEvents]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
