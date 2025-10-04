import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";

const AddBeautyProduct = () => {
  const { token } = useContext(AuthContext);
  const { addProduct } = useContext(ProductContext);

  const [form, setForm] = useState({
    brand: "",
    productType: "",
    price: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.brand || !form.productType || !form.price || !form.image) {
      setError("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", form.brand);
    formData.append("productType", form.productType);
    formData.append("price", form.price);
    formData.append("image", form.image);

    try {
      const res = await fetch("http://localhost:8080/auth/add-product", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("🎉 Product added successfully!");
        setForm({ brand: "", productType: "", price: "", image: null });
        addProduct(data.data);

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(data.message || "Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Beauty Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <select
            name="productType"
            value={form.productType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Type</option>
            <option value="Perfume">Perfume</option>
            <option value="Powder">Powder</option>
            <option value="Foundation">Foundation</option>
            <option value="Eyeliner">Eyeliner</option>
            <option value="Facewash">Facewash</option>
            <option value="Cream">Cream</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Add Product
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddBeautyProduct;
