import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

const BACKEND_URL = "http://localhost:8080/auth";

const SellerDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !token) {
      setError("You must be logged in to view this page.");
      setLoading(false);
      return;
    }

    if (user.role !== "seller") {
      setError("You are not a seller yet!");
      setLoading(false);
      return;
    }

    const fetchShop = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/my-shop`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to fetch shop details");
          setLoading(false);
          return;
        }

        setShop(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
        setLoading(false);
      }
    };

    fetchShop();
  }, [user, token]);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );

  return (
    <div className="flex justify-center mt-10 px-4">
      {shop && (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {shop.shopName}
            </h2>
            <p className="text-gray-500 mb-1">
              <strong>Type:</strong> {shop.shopType}
            </p>
            <p className="text-gray-500 mb-3">
              <strong>Address:</strong> {shop.shopAddress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
