import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../Components/Products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx";
import { getAllProducts } from "../redux/actions/product"; // If you have this action

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    // If allProducts might be empty on reload, fetch them
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const found = allProducts.find(
        (item) => item.name.toLowerCase() === productName.toLowerCase()
      );
      setData(found || null);
    }
  }, [allProducts, productName]);

  return (
    <div>
      <Header />
      {data ? (
        <>
          <ProductDetails data={data} />
          <SuggestedProduct data={data} />
        </>
      ) : (
        <div className="py-16 text-center text-gray-500">Loading product...</div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
