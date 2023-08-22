import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/productsSlice";
import { addItem, increaseQuantity } from "../store/basketSlice";
import Spinner from "../components/Spinner";

export default function Detail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.products.status);
  const products = useSelector((state) => state.products.products);
  const basket = useSelector((state) => state.basket.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = products.find((product) => product.id === productId);

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
    <div>
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2.5 bg-white shadow">
          <div className="pt-[80%] relative overflow-hidden">
            <img
              src={product.image}
              alt=""
              className="absolute top-0 left-0 object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-light">{product.name}</h2>
            <p className="mt-2 text-2xl font-bold">{product.price} ₺</p>
            <button
              onClick={handleAddToCart}
              className="w-full h-10 rounded bg-[#2A59FE] text-white mt-3"
            >
              Add To Cart
            </button>
            <p className="mt-4 text-sm">{product.description}</p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
