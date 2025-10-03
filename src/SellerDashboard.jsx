import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import Loader from "./Loader";
import AddMobileProduct from "./forms/AddMobileProduct";
import MobileSellerProducts from "./cards/MobileSellerProducts";
import AddHomeApplianceProduct from "./forms/AddHomeApplianceProduct";
import HomeApplianceSellerProducts from "./cards/HomeApplianceSellerProducts";

const BACKEND_URL = "http://localhost:8080/auth";

const SellerDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view this page.");
      setLoading(false);
      return;
    }

    const fetchShop = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/my-shop`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch shop");
        setShop(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === "seller") {
      fetchShop();
    } else if (user && user.role !== "seller") {
      setError("You are not a seller yet!");
      setLoading(false);
    }
  }, [user, token]);

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

  return (
    <div className="flex flex-col items-center mt-10 px-4 w-full">
      {shop && (
        <>
          {/* Shop Info */}
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="relative flex justify-center mt-6">
              {shop.shopPhotoUrl && (
                <img
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                  src={shop.shopPhotoUrl}
                  alt={shop.shopName}
                />
              )}
            </div>
            <div className="px-6 py-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{shop.shopName}</h2>
              <p className="text-gray-500 mb-1"><strong>Type:</strong> {shop.shopType}</p>
              <p className="text-gray-500 mb-3"><strong>Address:</strong> {shop.shopAddress}</p>
            </div>
          </div>

          {/* Mobile Seller */}
          {shop.shopType === "Mobile Seller" && token && (
            <ProductProvider user={user} token={token}>
              <AddMobileProduct />
              <div className="mt-6 w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Your Mobile Products</h2>
                <MobileSellerProducts />
              </div>
            </ProductProvider>
          )}

          {/* Home Appliance Seller */}
          {shop.shopType === "Home Appliance" && token && (
            <ProductProvider user={user} token={token}>
              <AddHomeApplianceProduct />
              <div className="mt-6 w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Your Home Appliance Products</h2>
                <HomeApplianceSellerProducts />
              </div>
            </ProductProvider>
          )}
        </>
      )}
    </div>
  );
};

export default SellerDashboard;
