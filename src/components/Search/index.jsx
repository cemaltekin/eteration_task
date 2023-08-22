import React from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/productsSlice";

export default function Search() {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    dispatch(setSearchTerm(searchTerm));
  };

  return (
    <div className="relative hidden lg:block">
      <input
        type="text"
        className="h-[40px] outline-none rounded-none pl-10 placeholder:font-bold pr-5 border-none w-[400px] "
        placeholder="Ara"
        onKeyUp={handleSearchChange}
      />
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
        <BiSearch className="text-[#C4C8D4]" size={24} />
      </div>
    </div>
  );
}
