import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Loader from "./Loader";

const BecomeSeller = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopType, setShopType] = useState(""); 
  const [shopPhoto, setShopPhoto] = useState(null); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state

  const handleBecomeSeller = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); // ✅ show loader

    if (!shopName || !shopAddress || !shopType || !shopPhoto) {
      setError("Please fill all fields and upload a shop photo.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("shopName", shopName);
      formData.append("shopAddress", shopAddress);
      formData.append("shopType", shopType);
      formData.append("shopImage", shopPhoto);

      const res = await fetch("http://localhost:8080/auth/become-seller", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.data);
        setMessage("🎉 Congratulations! You are now a seller.");
      } else {
        setError(data.message || "Failed to become a seller.");
      }
    } catch {
      setError("Failed to become a seller.");
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg font-medium">Please login first.</p>
      </div>
    );
  }

  if (user.role === "seller") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-green-600 text-lg font-semibold">
          You are already a seller!
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Become a Seller
        </h2>

        {loading ? (
          <Loader/>
        ) : (
          <form
            onSubmit={handleBecomeSeller}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Shop Address"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={shopType}
              onChange={(e) => setShopType(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Type</option>
              <option value="Mobile Seller">Mobile Seller</option>
              <option value="Fashion Seller">Fashion Seller</option>
              <option value="Home Appliance">Home Appliance</option>
              <option value="Beauty Seller">Beauty Seller</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setShopPhoto(e.target.files[0])}
              required
              className="w-full text-gray-700"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold transition ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-600"
              }`}
            >
              {loading ? "Processing..." : "Become Seller"}
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default BecomeSeller;


