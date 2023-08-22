import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuantity } from "../../store/basketSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const existingItem = basket.find((item) => item.id === product.id);

    if (existingItem) {
      dispatch(increaseQuantity(existingItem));
    } else {
      dispatch(addItem(product));
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white p-2.5">
        <div className="relative pt-[100%] overflow-hidden">
          <img
            src={product.image}
            className="absolute top-0 left-0 object-cover w-full h-full"
            alt=""
          />
        </div>
        <div className="flex flex-col mt-4">
          <span className="text-sm text-[#2A59FE]">{product.price}</span>
          <span className="mt-4 text-sm line-clamp-1">{product.name}</span>
          <button
            onClick={handleAddToCart}
            className="mt-4 h-[36px] rounded bg-[#2A59FE] text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
