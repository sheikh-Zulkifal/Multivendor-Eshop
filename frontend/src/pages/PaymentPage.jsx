import React from 'react'
import CheckoutSteps from '../Components/Checkout/CheckoutSteps'
import Payment from "../Components/Payment/Payment.jsx";
import Header from '../Components/layout/Header';
import Footer from '../Components/layout/Footer';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage