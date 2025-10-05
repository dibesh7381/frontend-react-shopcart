import { useState, useContext, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Loader from "../Loader";

const GrocerySellerProducts = () => {
  const { products, loading, error, deleteProduct, editProduct } = useContext(ProductContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    brand: "",
    productType: "",
    price: "",
    image: null,
  });
  const fileInputRef = useRef(null);

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      brand: product.brand,
      productType: product.productType,
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
    formData.append("brand", editForm.brand);
    formData.append("productType", editForm.productType);
    formData.append("price", editForm.price);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      const res = await fetch(`http://localhost:8080/auth/update-product/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products
        .filter((product) =>
          ["Atta", "Rice", "Dal", "Masala", "Soap", "Oil"].includes(product.productType)
        )
        .map((product) => (
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
                  <input
                    name="brand"
                    value={editForm.brand}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    name="productType"
                    value={editForm.productType}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Atta">Atta</option>
                    <option value="Rice">Rice</option>
                    <option value="Dal">Dal</option>
                    <option value="Masala">Masala</option>
                    <option value="Soap">Soap</option>
                    <option value="Oil">Oil</option>
                  </select>
                  <input
                    name="price"
                    value={editForm.price}
                    type="number"
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleEditChange}
                    className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
                    <button
                      className="px-4 cursor-pointer py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-1/2"
                      onClick={() => submitEdit(product.id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 cursor-pointer py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition w-full sm:w-1/2"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800">{product.brand}</h3>
                  <p className="text-gray-600">Type: {product.productType}</p>
                  <p className="text-gray-800 font-bold mt-2">₹ {product.price}</p>
                  <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 gap-2">
                    <button
                      className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-1/2"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-1/2"
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

export default GrocerySellerProducts;
