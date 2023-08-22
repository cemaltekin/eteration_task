import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOption } from "../../store/productsSlice";

export default function SortFilter() {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.products.sortOption);

  const handleSortChange = (option) => {
    dispatch(setSortOption(option));
  };

  return (
    <div>
      <span className="text-xs text-[#333333B2]">Sort By</span>
      <div className="bg-white shadow p-4 flex flex-col gap-4 mt-1.5">
        <label
          htmlFor="oldToNew"
          className="flex items-center gap-2 cursor-pointer checkboxRow"
        >
          <input
            type="radio"
            id="oldToNew"
            name="sortBy"
            className="hidden"
            checked={sortOption === "oldToNew"}
            onChange={() => handleSortChange("oldToNew")}
          />
          <span className="check w-4 h-4 min-w-4 min-h-4 rounded-full border-2 border-[#2A59FE] p-1 flex items-center justify-center">
            <span className="checked  w-2 h-2 min-w-[8px] min-h-[8px] rounded-full block bg-[#2A59FE] opacity-0 pointer-events-none"></span>
          </span>
          <span className="text">Old to new</span>
        </label>
        <label
          htmlFor="newToOld"
          className="flex items-center gap-2 cursor-pointer checkboxRow"
        >
          <input
            type="radio"
            id="newToOld"
            name="sortBy"
            className="hidden"
            checked={sortOption === "newToOld"}
            onChange={() => handleSortChange("newToOld")}
          />
          <span className="check w-4 h-4 min-w-4 min-h-4 rounded-full border-2 border-[#2A59FE] p-1 flex items-center justify-center">
            <span className="checked  w-2 h-2 min-w-[8px] min-h-[8px] rounded-full block bg-[#2A59FE] opacity-0 pointer-events-none"></span>
          </span>
          <span className="text">New to old</span>
        </label>
        <label
          htmlFor="priceHighToLow"
          className="flex items-center gap-2 cursor-pointer checkboxRow"
        >
          <input
            type="radio"
            id="priceHighToLow"
            name="sortBy"
            className="hidden"
            checked={sortOption === "priceHighToLow"}
            onChange={() => handleSortChange("priceHighToLow")}
          />
          <span className="check w-4 h-4 min-w-4 min-h-4 rounded-full border-2 border-[#2A59FE] p-1 flex items-center justify-center">
            <span className="checked  w-2 h-2 min-w-[8px] min-h-[8px] rounded-full block bg-[#2A59FE] opacity-0 pointer-events-none"></span>
          </span>
          <span className="text">Price high to low</span>
        </label>
        <label
          htmlFor="priceLowToHigh"
          className="flex items-center gap-2 cursor-pointer checkboxRow"
        >
          <input
            type="radio"
            id="priceLowToHigh"
            name="sortBy"
            className="hidden"
            checked={sortOption === "priceLowToHigh"}
            onChange={() => handleSortChange("priceLowToHigh")}
          />
          <span className="check w-4 h-4 min-w-4 min-h-4 rounded-full border-2 border-[#2A59FE] p-1 flex items-center justify-center">
            <span className="checked  w-2 h-2 min-w-[8px] min-h-[8px] rounded-full block bg-[#2A59FE] opacity-0 pointer-events-none"></span>
          </span>
          <span className="text">Price low to High</span>
        </label>
      </div>
    </div>
  );
}
