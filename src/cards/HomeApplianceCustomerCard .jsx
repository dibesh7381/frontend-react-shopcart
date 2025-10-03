import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const HomeApplianceCustomerCard = ({ product, addToCart }) => {
  const [buying, setBuying] = useState(false);
  const { user } = useContext(AuthContext); // 👈 get current user

  const isSeller = user?.role === "seller"; // 👈 check role

  const handleBuyNow = () => {
    setBuying(true);
    addToCart(product); // Cart me add
    alert(`🎉 ${product.brand} ${product.model} added to cart!`);
    setBuying(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col w-full max-w-sm mx-auto">
      {/* Image */}
      <div className="h-64 w-full overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.brand + " " + product.model}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-800">{product.brand}</h3>
        <p className="text-gray-600">{product.model}</p>
        <p className="text-gray-600">Color: {product.color}</p>
        <p className="text-gray-600">Type: {product.productType}</p>
        <p className="text-gray-800 font-bold mt-2">₹ {product.price}</p>

        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
          <button
            onClick={handleBuyNow}
            disabled={buying || isSeller} // 👈 disable if seller
            className={`px-4 py-2 rounded-lg w-full sm:w-1/2 transition ${
              isSeller
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Buy Now
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={isSeller} // 👈 disable if seller
            className={`px-4 py-2 rounded-lg w-full sm:w-1/2 transition ${
              isSeller
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

export default HomeApplianceCustomerCard;
