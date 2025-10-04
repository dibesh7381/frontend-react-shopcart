import { createContext, useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:8080/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerProductContext = createContext();

export const CustomerProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // ---------------- Fetch All Products ----------------
  const fetchProducts = async () => {
    if (!token) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch products");

      setProducts(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Add Product to Cart (Optional) ----------------
  const addToCart = (product) => {
    console.log("Added to cart:", product);
    // Future: integrate with cart context or localStorage
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <CustomerProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addToCart,
        token,
        setToken, // optional, agar kabhi token update karna ho
      }}
    >
      {children}
    </CustomerProductContext.Provider>
  );
};