import React from "react";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import CreateProduct from "../../Components/Shop/CreateProduct.jsx";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[330px]  ">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
