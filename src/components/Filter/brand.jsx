import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrandFilter } from "../../store/productsSlice";

export default function BrandFilter() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const selectedBrands = useSelector((state) => state.products.selectedBrands);

  const [searchTerm, setSearchTerm] = useState("");

  const brands = products.map((product) => product.brand);
  const uniqueBrands = [...new Set(brands)];

  const handleBrandClick = (brand) => {
    dispatch(toggleBrandFilter(brand));
  };

  const filteredBrands = uniqueBrands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <span className="text-xs text-[#333333B2]">Brands</span>
      <div className="bg-white shadow p-4 flex flex-col gap-4 mt-1.5">
        <div className="relative bg-[#ccc]/20">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent h-[40px] outline-none pr-2 pl-8 placeholder:text-[#ccc]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute -translate-y-1/2 left-3 top-1/2">
            <BiSearch className="text-[#ccc]" />
          </span>
        </div>
        <div className="max-h-[83px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <label
                key={brand}
                htmlFor={brand}
                className="flex items-center gap-2 cursor-pointer checkboxRow"
              >
                <input
                  type="checkbox"
                  name=""
                  id={brand}
                  className="hidden"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandClick(brand)}
                />
                <span className="check w-4 h-4 min-w-[16px] min-h-[16px] flex items-center justify-center rounded-[2px] border-2 border-[#2A59FE]">
                  <span className="checked opacity-0 pointer-events-none bg-[#2A59FE] w-full h-full flex items-center justify-center">
                    <AiOutlineCheck className="text-white" />
                  </span>
                </span>
                <span className="text">{brand}</span>
              </label>
            ))
          ) : (
            <div>Hiçbir marka bulunamadı.</div>
          )}
        </div>
      </div>
    </div>
  );
}
