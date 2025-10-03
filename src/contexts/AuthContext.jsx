import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchProfile();
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

