import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader.jsx'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar.jsx'
import DashboardHero from '../../Components/Shop/DashboardHero.jsx';


const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
            <div className="w-[80px] md:w-[330px]  ">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
    </div>
  )
}

export default ShopDashboardPage
