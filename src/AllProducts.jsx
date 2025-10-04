import { useContext } from "react";
import { CustomerProductContext } from "./contexts/CustomerProductContext";
import Loader from "./Loader";
import HomeApplianceCustomerCard from "./cards/HomeApplianceCustomerCard ";
import MobileCustomerProducts from "./cards/MobileCustomerProducts";
import BeautyCustomerCard from "./cards/BeautyCustomerCard";
import GroceryCustomerCard from "./cards/GroceryCustomerCard";
import FashionCustomerCard from "./cards/FashionCustomerCard"; // ✅ Fashion

const AllProducts = () => {
  const { products, loading, error, addToCart } = useContext(CustomerProductContext);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // Shop type wise filter
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

      {/* Mobile Shop Section */}
      {mobileProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-4">Mobiles</h2>
          <MobileCustomerProducts
            products={mobileProducts}
            addToCart={addToCart}
          />
        </>
      )}

      {/* Beauty Shop Section */}
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

      {/* Grocery Shop Section */}
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

      {/* Fashion Shop Section */}
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
    </div>
  );
};

export default AllProducts;
