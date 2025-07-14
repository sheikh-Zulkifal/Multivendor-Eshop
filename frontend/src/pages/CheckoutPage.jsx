import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CheckoutSteps from "../Components/Checkout/CheckoutSteps.jsx";
import Checkout from '../components/Checkout/Checkout.jsx';



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