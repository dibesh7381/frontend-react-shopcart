import { useState, useContext, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Loader from "../Loader";

const FashionSellerProducts = () => {
  const { products, loading, error, deleteProduct, editProduct } =
    useContext(ProductContext);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    category: "",
    brand: "",
    productType: "",
    size: "",
    color: "",
    quantity: "",
    price: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      category: product.category,
      brand: product.brand,
      productType: product.productType,
      size: product.size,
      color: product.color,
      quantity: product.quantity,
      price: product.price,
      image: null,
    });
  };

  const handleEditChange = (e) => {
    if (e.target.name === "image") {
      setEditForm({ ...editForm, image: e.target.files[0] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const submitEdit = async (id) => {
    const formData = new FormData();
    for (const key in editForm) {
      if (editForm[key]) formData.append(key, editForm[key]);
    }

    try {
      const res = await fetch(
        `http://localhost:8080/auth/update-product/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        editProduct(data.data);
        setEditingId(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  // Fashion product types filter
  const fashionTypes = [
    "Shirts",
    "Jeans",
    "T-Shirts",
    "Trackpants",
    "Shoes",
    "Shorts",
    "Innerwear",
  ];

  const fashionProducts = products.filter((p) =>
    fashionTypes.includes(p.productType)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {fashionProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col w-full max-w-sm mx-auto"
        >
          <div className="h-64 w-full overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.brand}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1">
            {editingId === product.id ? (
              <>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Kids">Kids</option>
                </select>

                <input
                  name="brand"
                  value={editForm.brand}
                  onChange={handleEditChange}
                  placeholder="Brand"
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                  name="productType"
                  value={editForm.productType}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Type</option>
                  {fashionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <input
                  name="size"
                  value={editForm.size}
                  onChange={handleEditChange}
                  placeholder="Size"
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="color"
                  value={editForm.color}
                  onChange={handleEditChange}
                  placeholder="Color"
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="quantity"
                  type="number"
                  value={editForm.quantity}
                  onChange={handleEditChange}
                  placeholder="Quantity"
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="image"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    onClick={() => submitEdit(product.id)}
                  >
                    Save
                  </button>
                  <button
                    className="flex-1 cursor-pointer bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{product.brand}</h3>
                <p>Type: {product.productType}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                <p>Available Stocks: {product.quantity}</p>
                <p className="font-bold">₹ {product.price}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => startEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 cursor-pointer bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FashionSellerProducts;
