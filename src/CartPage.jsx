// src/pages/CartPage.js
import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "./redux/cartSlice";
import { AuthContext } from "./contexts/AuthContext";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { token } = useContext(AuthContext);

  // ---------------- Fetch Cart on Mount ----------------
  useEffect(() => {
    if (token) dispatch(fetchCart(token));
  }, [dispatch, token]);

  const normalizedItems = cartItems.map((item) => ({
    id: item.product?.id || item.id,
    brand: item.product?.brand || item.brand,
    price: item.product?.price || item.price,
    imageUrl: item.product?.imageUrl || item.imageUrl,
    available: item.product?.quantity || item.available || 0,
    quantity: item.quantity || 0,
  }));

  const totalPrice = normalizedItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  if (!token)
    return <p className="text-center mt-20 text-lg">Please login to view your cart.</p>;
  if (!normalizedItems.length)
    return <p className="text-center mt-20 text-lg">Your cart is empty.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      <div className="space-y-6 mb-32">
        {normalizedItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.imageUrl || "/placeholder.png"}
              alt={item.brand || "Product"}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
            />

            <div className="flex-1 sm:ml-6 mt-3 sm:mt-0">
              <h2 className="text-lg sm:text-xl font-semibold">{item.brand}</h2>
              <p className="text-gray-600 mt-1">₹ {item.price}</p>
            </div>

            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id, token))}
                className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-3 py-1 bg-gray-50 rounded-full text-sm">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id, token))}
                className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id, token))}
                className="ml-2 px-2 sm:px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-1"
              >
                🗑 Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Card Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-50">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold">Total:</h2>
          <p className="text-xl sm:text-2xl font-bold text-green-600">₹ {totalPrice}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => dispatch(clearCart(token))}
            className="flex-1 sm:flex-none bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition text-sm"
          >
            Clear Cart
          </button>

          <button
            onClick={() => alert("Buy Now clicked!")}
            className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;






