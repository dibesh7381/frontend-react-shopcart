import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "./contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
          ShopCart
        </Link>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          {user?.role === "customer" && (
            <Link to="/cart" className="relative text-gray-200 text-3xl hover:text-white transition">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition">About</Link>
          <Link to="/all-products" className="text-gray-200 hover:text-white transition">All Products</Link>

          {/* Desktop Cart: Only customer, profile se pehle */}

          {!user ? (
            <>
              <Link to="/signup" className="text-gray-200 hover:text-white transition">Signup</Link>
              <Link to="/login" className="text-gray-200 hover:text-white transition">Login</Link>
            </>
          ) : (
            <>
              {user.role === "customer" && (
                <Link to="/become-seller" className="text-gray-200 hover:text-white transition">Become Seller</Link>
              )}
              {user.role === "seller" && (
                <Link to="/seller-dashboard" className="text-gray-200 hover:text-white transition">Seller Dashboard</Link>
              )}

              {/* Profile button after Cart */}
              <Link to="/profile" className="text-gray-200 hover:text-white transition">Profile</Link>

               {user?.role === "customer" && (
            <Link to="/cart" className="relative text-gray-200 text-3xl hover:text-white transition">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

              <button
                onClick={handleLogout}
                className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg md:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl">✕</button>
        </div>
        <div className="flex flex-col space-y-4 px-6 mt-4">
          <Link to="/" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/all-products" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>All Products</Link>

          {/* Mobile Cart: Only customer */}
         

          {!user ? (
            <>
              <Link to="/signup" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Signup</Link>
              <Link to="/login" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              {user.role === "customer" && (
                <Link to="/become-seller" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Become Seller</Link>
              )}
              {user.role === "seller" && (
                <Link to="/seller-dashboard" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Seller Dashboard</Link>
              )}
              <Link to="/profile" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Profile</Link>
              <button
                onClick={handleLogout}
                className="text-left bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;
