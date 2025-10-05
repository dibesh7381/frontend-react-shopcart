import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Loader from "./Loader"; // ✅ apna loader import kar le

const Profile = () => {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loader ke liye state
  const navigate = useNavigate();

  // Initialize form with user data
  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); // ✅ update request ke time loader on

    try {
      const res = await fetch("http://localhost:8080/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.data);
        setMessage(data.message || "Profile updated successfully!");
        setForm({ name: data.data.name, email: data.data.email, password: "" });
      } else {
        setError(data.message || "Update failed!");
      }
    } catch {
      setError("Update failed! Please try again.");
    } finally {
      setLoading(false); // ✅ request complete hone par loader off
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg font-medium">
          Please login first.
        </p>
      </div>
    );

  // ✅ Agar loader true hai toh spinner ya skeleton dikha do
// ✅ Agar loader true hai toh sirf spinner dikhaye, background page ke saath
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Profile
        </h2>

        {user.role && (
          <p
            className={`mt-2 text-center text-sm font-semibold ${
              user.role === "customer" ? "text-green-600" : "text-blue-600"
            }`}
          >
            🎉 Congratulations! You are logged in as a {user.role}.
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full cursor-pointer bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;


