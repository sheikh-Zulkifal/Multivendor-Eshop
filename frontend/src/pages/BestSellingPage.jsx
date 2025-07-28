import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import ProductCard from '../Components/Route/ProductCard/ProductCard'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/layout/Loader'
import { getAllProducts } from '../redux/actions/product'

const BestSellingPage = () => {
     const [data, setData] = useState([]);
  const {allProducts} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    setData(sortedData);
    dispatch(getAllProducts());
  }, [allProducts]);
  
  

  return (
   
      <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
    )
   }
   

export default BestSellingPage
