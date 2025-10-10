// src/components/GroceryCustomerCard.js
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";
import { addToCart } from "../redux/cartSlice";

const GroceryCustomerCard = ({ product }) => {
  const [buying, setBuying] = useState(false);
  const { user, token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const isSeller = user?.role === "seller";

  const handleBuyNow = async () => {
    if (!token) {
      alert("Please login to buy products!");
      return;
    }
    if (product.quantity <= 0) return;

    setBuying(true);
    await dispatch(addToCart({ productId: product.id, token }));
    alert(`🎉 ${product.brand} added to cart!`);
    setBuying(false);
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add products to cart!");
      return;
    }
    if (product.quantity <= 0) return;

    await dispatch(addToCart({ productId: product.id, token }));
    alert(`🛒 ${product.brand} added to cart!`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col w-full max-w-sm mx-auto">
      <div className="h-64 w-full overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.brand}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-800">{product.brand}</h3>
        <p className="text-gray-600">Type: {product.productType}</p>
        <p className="text-gray-800 font-bold mt-2">₹ {product.price}</p>
        <p className="text-gray-600 mt-1">
          Available Stocks: {product.quantity}
        </p>

        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
          <button
            onClick={handleBuyNow}
            disabled={buying || isSeller || product.quantity <= 0}
            className={`px-4 py-2 cursor-pointer rounded-lg w-full sm:w-1/2 transition ${
              isSeller || product.quantity <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isSeller || product.quantity <= 0}
            className={`px-4 py-2 cursor-pointer rounded-lg w-full sm:w-1/2 transition ${
              isSeller || product.quantity <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryCustomerCard;
