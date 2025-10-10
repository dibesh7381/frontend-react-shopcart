import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";

const AddMobileProduct = () => {
  const { token } = useContext(AuthContext);
  const { addProduct } = useContext(ProductContext);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    color: "",
    price: "",      // ✅ empty string so placeholder shows
    quantity: "",   // ✅ empty string so placeholder shows
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else if (name === "price" || name === "quantity") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) }); // ✅ empty string handling
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.brand || !form.model || !form.color || form.price === "" || form.quantity === "" || !form.image) {
      setError("Please fill all fields, select an image, and set quantity.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", form.brand);
    formData.append("model", form.model);
    formData.append("color", form.color);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
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
        setForm({ brand: "", model: "", color: "", price: "", quantity: "", image: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
        addProduct(data.data);
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
          Add Mobile Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="brand" placeholder="Enter Brand" value={form.brand} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="text" name="model" placeholder="Enter Model" value={form.model} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="text" name="color" placeholder="Enter Color" value={form.color} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="number" name="price" min={0} placeholder="Enter Price (₹)" value={form.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="number" name="quantity" min={1} placeholder="Enter Quantity" value={form.quantity} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="file" name="image" accept="image/*" ref={fileInputRef} onChange={handleChange} className="w-full text-gray-700"/>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">Add Product</button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddMobileProduct;

