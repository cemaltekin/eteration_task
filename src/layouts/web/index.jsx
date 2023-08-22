import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Basket from "../../components/Basket";
export default function WebLayout() {
  return (
    <div className='bg-[#f9f9f9] h-full min-h-screen pb-20'>
      <Header />
      <div className='container mx-auto px-5 2xl:px-0 grid grid-cols-1 lg:grid-cols-[auto_220px] gap-10 mt-10'>
        <Outlet />
        <Basket />
      </div>
    </div>
  );
}
