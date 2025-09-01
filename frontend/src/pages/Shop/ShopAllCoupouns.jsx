import React from 'react'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import AllCoupouns from "../../Components/Shop/AllCoupouns.jsx"

const ShopAllCoupouns = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[330px]  ">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupouns/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupouns
