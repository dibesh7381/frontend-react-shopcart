import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">AuthApp</h1>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition">About</Link>

          {!user ? (
            <>
              <Link to="/signup" className="text-gray-200 hover:text-white transition">Signup</Link>
              <Link to="/login" className="text-gray-200 hover:text-white transition">Login</Link>
            </>
          ) : (
            <>
              {user.role === "customer" && (
                <Link to="/become-seller" className="text-gray-200 hover:text-white transition">
                  Become Seller
                </Link>
              )}
              {user.role === "seller" && (
                <Link to="/seller-dashboard" className="text-gray-200 hover:text-white transition">
                  Seller Dashboard
                </Link>
              )}
              <Link to="/profile" className="text-gray-200 hover:text-white transition">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg md:hidden z-50`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
        </div>
        <div className="flex flex-col space-y-4 px-6 mt-4">
          <Link to="/" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>About</Link>

          {!user ? (
            <>
              <Link to="/signup" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Signup</Link>
              <Link to="/login" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              {user.role === "customer" && (
                <Link to="/become-seller" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
                  Become Seller
                </Link>
              )}
              {user.role === "seller" && (
                <Link to="/seller-dashboard" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>
                  Seller Dashboard
                </Link>
              )}
              <Link to="/profile" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-left bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
