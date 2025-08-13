import React from 'react'
import Header from '../Components/layout/Header.jsx'
import Hero from '../Components/Route/Hero/Hero.jsx'
import Categories from '../Components/Route/Categories/Categories.jsx'
import BestDeals from '../Components/Route/BestDeals/BestDeals.jsx'
import FeaturedProduct from '../Components/Route/FeaturedProduct/FeaturedProduct.jsx'
import Sponsored from '../Components/Route/Sponsored.jsx'
import Events from '../Components/Events/Events.jsx'
import Footer from '../Components/layout/Footer.jsx'




function HomePage() {
  return (
    <div>
      <Header activeHeading = {1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>
      
    </div>
  )
}

export default HomePage
