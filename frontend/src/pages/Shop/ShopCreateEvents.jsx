import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import CreateEvent from "../../Components/Shop/CreateEvent.jsx"

const ShopCreateEvents = () => {
  return (
   <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[330px]  ">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent/>
        </div>
      </div>
    </div>
  )
}

export default ShopCreateEvents
