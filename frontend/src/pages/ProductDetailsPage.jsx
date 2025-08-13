import React, { useEffect, useState } from "react";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import ProductDetails from "../Components/Products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx";
import { getAllProducts } from "../redux/actions/product"; // If you have this action

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
   
    
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
 

  useEffect(() => {
    const data = allProducts && allProducts.find((item) => item._id === id);
    setData(data);
  }, [data, allProducts]);
  

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
