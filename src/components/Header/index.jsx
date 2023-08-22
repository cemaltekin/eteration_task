import React from "react";
import { useSelector } from "react-redux";
import Search from "../Search";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

export default function Header() {
  const items = useSelector((state) => state.basket.items);

  const calculateTotal = () => {
    return items.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className="bg-[#2A59FE] py-1 sticky top-0 z-50">
      <div className="container mx-auto px-5 2xl:px-0 flex justify-between lg:justify-normal lg:grid lg:grid-cols-[220px_auto_220px] gap-10">
        <Link to="/" className="text-3xl font-bold text-white">
          Eteration
        </Link>
        <Search />
        <div className="flex items-center gap-5 text-white">
          <div className="flex items-center gap-2">
            <BsBag />
            <span className="text-sm">
              {total.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineUser />
            <span className="text-sm">Kerem</span>
          </div>
        </div>
      </div>
    </div>
  );
}
