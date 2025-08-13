import React from 'react';
import Header from '../Components/layout/Header';
import Footer from '../Components/layout/Footer';
import CheckoutSteps from "../Components/Checkout/CheckoutSteps.jsx";
import Checkout from '../Components/Checkout/Checkout.jsx';



const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage