import { useContext } from "react";
import { CustomerProductContext } from "./contexts/CustomerProductContext"; // ✅ customer context
import Loader from "./Loader";
import HomeApplianceCustomerCard from "./cards/HomeApplianceCustomerCard ";
import MobileCustomerProducts from "./cards/MobileCustomerProducts";

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
            products={mobileProducts} // ✅ Array pass karna
            addToCart={addToCart}
          />
        </>
      )}
    </div>
  );
};

export default AllProducts;


