import { useState, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Loader from "../Loader";

const MobileSellerProducts = () => {
  const { products, loading, error, deleteProduct, editProduct } = useContext(ProductContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    brand: "",
    model: "",
    color: "",
    price: 0,
    quantity: 1,
  });

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      brand: product.brand || "",
      model: product.model || "",
      color: product.color || "",
      price: product.price || 0,
      quantity: product.quantity || 1,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") setEditForm({ ...editForm, price: parseFloat(value) || 0 });
    else if (name === "quantity") setEditForm({ ...editForm, quantity: parseInt(value) || 0 });
    else setEditForm({ ...editForm, [name]: value });
  };

  const submitEdit = async (id) => {
    if (editForm.price === "" || editForm.quantity === "") {
      alert("Please fill Price and Quantity!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/auth/update-product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // ✅ important
        },
        body: JSON.stringify(editForm), // ✅ send JSON instead of FormData
      });

      const data = await res.json();
      if (data.success) {
        editProduct(data.data);
        setEditingId(null);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col w-full max-w-sm mx-auto">
          <div className="h-64 w-full overflow-hidden rounded-t-3xl bg-gray-100 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.brand + " " + product.model}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1">
            {editingId === product.id ? (
              <>
                <input
                  name="brand"
                  placeholder="Brand"
                  value={editForm.brand}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="model"
                  placeholder="Model"
                  value={editForm.model}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="color"
                  placeholder="Color"
                  value={editForm.color}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="price"
                  type="number"
                  min={0}
                  placeholder="Price (₹)"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  name="quantity"
                  type="number"
                  min={0}
                  placeholder="Quantity"
                  value={editForm.quantity}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-1/2"
                    onClick={() => submitEdit(product.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 w-full sm:w-1/2"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-800">{product.brand}</h3>
                <p className="text-gray-600">{product.model}</p>
                <p className="text-gray-600">Color: {product.color}</p>
                <p className="text-gray-800 font-bold mt-2">₹ {product.price}</p>
                <p className="text-gray-600 mt-1">Available Stocks: {product.quantity}</p>
                <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-1/2"
                    onClick={() => startEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-1/2"
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

export default MobileSellerProducts;



