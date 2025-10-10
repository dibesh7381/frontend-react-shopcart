import { useContext } from "react";
import { CustomerProductContext } from "./contexts/CustomerProductContext";
import { AuthContext } from "./contexts/AuthContext"; // 👈 Import AuthContext
import Loader from "./Loader";
import HomeApplianceCustomerCard from "./cards/HomeApplianceCustomerCard ";
import MobileCustomerProducts from "./cards/MobileCustomerProducts";
import BeautyCustomerCard from "./cards/BeautyCustomerCard";
import GroceryCustomerCard from "./cards/GroceryCustomerCard";
import FashionCustomerCard from "./cards/FashionCustomerCard";
import ShoesCustomerCard from "./cards/ShoesCustomerCard";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const { products, loading, error, addToCart } = useContext(CustomerProductContext);
  const { user } = useContext(AuthContext); // ✅ Get user from AuthContext
  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // 👇 If user not logged in — show message and login button
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-white shadow-lg p-8 rounded-2xl w-[90%] sm:w-[400px]">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to log in to view products and start shopping.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Product Filters ----------------
  const homeApplianceProducts = products.filter(
    (product) => product.shopType === "Home Appliance"
  );
  const mobileProducts = products.filter(
    (product) => product.shopType === "Mobile Seller"
  );
  const beautyProducts = products.filter(
    (product) => product.shopType === "Beauty Seller"
  );
  const groceryProducts = products.filter(
    (product) => product.shopType === "Grocery Seller"
  );
  const fashionProducts = products.filter(
    (product) => product.shopType === "Fashion Seller"
  );
  const shoesProducts = products.filter(
    (product) => product.shopType === "Shoes Seller"
  );

  return (
    <div className="p-4 space-y-10">
      {/* Home Appliance Section */}
      {homeApplianceProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Home Appliances</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeApplianceProducts.map((product) => (
              <HomeApplianceCustomerCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}

      {/* Mobile Section */}
      {mobileProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Mobiles</h2>
          <MobileCustomerProducts products={mobileProducts} addToCart={addToCart} />
        </>
      )}

      {/* Beauty Section */}
      {beautyProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Beauty Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beautyProducts.map((product) => (
              <BeautyCustomerCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}

      {/* Grocery Section */}
      {groceryProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Grocery Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groceryProducts.map((product) => (
              <GroceryCustomerCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}

      {/* Fashion Section */}
      {fashionProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Fashion Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fashionProducts.map((product) => (
              <FashionCustomerCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}

      {/* ✅ Shoes Section */}
      {shoesProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Shoes Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoesProducts.map((product) => (
              <ShoesCustomerCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;


