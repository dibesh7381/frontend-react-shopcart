import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";

const AddHomeApplianceProduct = () => {
  const { token } = useContext(AuthContext);
  const { addProduct } = useContext(ProductContext);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    color: "",
    productType: "", 
    price: "",
    quantity: 1, // ✅ Quantity added
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

    if (
      !form.brand ||
      !form.model ||
      !form.color ||
      !form.productType ||
      !form.price ||
      !form.quantity || // ✅ check quantity
      !form.image
    ) {
      setError("Please fill all fields, select an image, and set quantity.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", form.brand);
    formData.append("model", form.model);
    formData.append("color", form.color);
    formData.append("productType", form.productType);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity); // ✅ append quantity
    formData.append("image", form.image);

    try {
      const res = await fetch("http://localhost:8080/auth/add-product", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("🎉 Product added successfully!");
        setForm({ brand: "", model: "", color: "", productType: "", price: "", quantity: 1, image: null });
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
          Add Home Appliance Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="productType"
            value={form.productType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Type</option>
            <option value="TV">TV</option>
            <option value="Fridge">Fridge</option>
            <option value="Cooler">Cooler</option>
            <option value="AC">AC</option>
            <option value="Microwave">Microwave</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* ✅ Quantity input */}
          <input
            type="number"
            name="quantity"
            min={1}
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
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

export default AddHomeApplianceProduct;
