import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";

const AddShoesProduct = () => {
  const { token } = useContext(AuthContext);
  const { addProduct } = useContext(ProductContext);

  const [form, setForm] = useState({
    category: "",
    brand: "",
    productType: "",
    color: "",
    shoeSize: "",
    quantity: 1,
    price: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (!form.category || !form.brand || !form.productType || !form.color || !form.shoeSize || !form.quantity || !form.price || !form.image) {
      setError("Please fill all fields and select an image.");
      return;
    }

    if (!token) {
      setError("You must be logged in to add a product.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) formData.append(key, form[key]);
      });

      const res = await fetch("http://localhost:8080/auth/add-product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("🎉 Shoes product added successfully!");
        setForm({
          category: "",
          brand: "",
          productType: "",
          color: "",
          shoeSize: "",
          quantity: 1,
          price: "",
          image: null,
        });
        addProduct(data.data);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(data.message || "Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding the product!");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Shoes Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select Category</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Kids">Kids</option>
          </select>

          <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="w-full px-4 py-2 border rounded-lg" />

          <select name="productType" value={form.productType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select Type</option>
            <option value="Shoes">Shoes</option>
            <option value="Sandle">Sandle</option>
            <option value="Slipper">Slipper</option>
            <option value="Crocks">Crocks</option>
          </select>

          <input type="text" name="shoeSize" value={form.shoeSize} onChange={handleChange} placeholder="Shoe Size (6,7,8...)" className="w-full px-4 py-2 border rounded-lg" />
          <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Color" className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min={1} placeholder="Quantity" className="w-full px-4 py-2 border rounded-lg" />
          <input type="number" name="price" value={form.price} onChange={handleChange} min={0} placeholder="Price" className="w-full px-4 py-2 border rounded-lg" />

          <input type="file" name="image" ref={fileInputRef} onChange={handleChange} className="w-full text-gray-700" />

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Add Shoes
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddShoesProduct;
