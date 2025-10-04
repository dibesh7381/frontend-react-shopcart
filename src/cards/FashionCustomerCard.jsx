import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const FashionCustomerCard = ({ product, addToCart }) => {
  const [buying, setBuying] = useState(false);
  const { user } = useContext(AuthContext);

  const isSeller = user?.role === "seller";

  const handleBuyNow = () => {
    setBuying(true);
    addToCart(product);
    alert(`🎉 ${product.brand} ${product.productType} added to cart!`);
    setBuying(false);
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
        <h3 className="text-2xl font-semibold">{product.brand}</h3>
        <p>Type: {product.productType}</p>
        <p>Size: {product.size}</p>
        <p>Color: {product.color}</p>
        <p>Qty: {product.quantity}</p>
        <p className="font-bold mt-2">₹ {product.price}</p>

        <div className="mt-auto flex gap-2 pt-4">
          <button
            onClick={handleBuyNow}
            disabled={buying || isSeller}
            className={`flex-1 py-2 rounded-lg transition ${
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
            className={`flex-1 py-2 rounded-lg transition ${
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

export default FashionCustomerCard;
