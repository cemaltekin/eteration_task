import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/basketSlice";

export default function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items);

  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div>
      {basket.length === 0 ? (
        <div>Sepette henüz ürün yok.</div>
      ) : (
        <div>
          {basket.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow p-2.5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-[10px] text-[#93ABFF] font-medium">
                    {item.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="w-6 h-6 flex items-center justify-center text-[#626B8A] bg-[#F3F4F6] text-lg"
                  >
                    -
                  </button>
                  <span className="w-6 h-6 flex items-center justify-center text-center bg-[#2A59FE] text-white text-lg font-extralight">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item))}
                    className="w-6 h-6 flex items-center justify-center text-[#626B8A] bg-[#F3F4F6] text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="p-3 mt-10 bg-white shadow">
            <div className="text-sm">
              Toplam Fiyat:{" "}
              {total.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </div>
            <button className="w-full h-[30px] rounded-md text-white mt-5 text-sm bg-[#2A59FE]">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
