import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ShoesCustomerCard = ({ product, addToCart }) => {
  const { user } = useContext(AuthContext);
  const isSeller = user?.role === "seller";

  const handleBuyNow = () => {
    addToCart(product);
    alert(`🎉 ${product.brand} ${product.productType} added to cart!`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col w-full max-w-sm mx-auto overflow-hidden">
      {/* Image */}
      <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-t-3xl overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.brand + " " + product.productType}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
         {/* Brand + Category */}
        <h3 className="text-2xl font-semibold text-gray-800">
          {product.brand}{" "}
          <span className="text-gray-500 text-lg font-normal">
            | {product.category || "Unisex"}
          </span>
        </h3>
        <p className="text-gray-600">{product.productType}</p>
        <p className="text-gray-600">Shoe Size: {product.shoeSize}</p>
        <p className="text-gray-600">Color: {product.color}</p>
        <p className="text-gray-600">Qty: {product.quantity}</p>
        <p className="font-bold text-lg mt-2">₹ {product.price}</p>

        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
          <button
            onClick={handleBuyNow}
            disabled={isSeller}
            className={`px-4 cursor-pointer py-2 rounded-lg w-full sm:w-1/2 transition ${
              isSeller
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            Buy Now
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={isSeller}
            className={`px-4 cursor-pointer py-2 rounded-lg w-full sm:w-1/2 transition ${
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

export default ShoesCustomerCard;
