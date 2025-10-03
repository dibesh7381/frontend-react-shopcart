import { createContext, useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:8080/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ user, token, children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch seller products
  const fetchProducts = async () => {
    if (!user || user.role !== "seller") return;
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/my-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setProducts(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Add product to list
  const addProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/delete-product/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProducts(products.filter(p => p.id !== productId));
      else alert(data.message || "Failed to delete product");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // Edit product
  const editProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  useEffect(() => {
    fetchProducts();
  }, [user, token]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        deleteProduct,
        editProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
