import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      // ✅ Backend structure: { success, message, data: { name, email } }
      if (data.success && data.data) {
        setUser(data.data);
      }
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
