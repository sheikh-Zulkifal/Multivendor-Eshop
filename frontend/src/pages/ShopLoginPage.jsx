import React, { useEffect } from 'react'
import ShopLogin from "../Components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
    const { isSeller, seller } = useSelector((state) => state.seller);
    const navigate =  useNavigate()
    useEffect(() => {
      if (isSeller) {
        navigate(`/shop/${seller._id} `);
      }
    }, []);
  
  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
