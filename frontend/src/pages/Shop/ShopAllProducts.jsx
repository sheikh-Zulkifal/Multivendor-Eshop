import React from 'react'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import AllProducts from "../../Components/Shop/Layout/AllProducts.jsx"

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[330px]  ">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts
