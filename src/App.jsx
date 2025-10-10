import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CustomerProductProvider } from "./contexts/CustomerProductContext";

import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import BecomeSeller from "./BecomeSeller";
import SellerDashboard from "./SellerDashboard";
import AllProducts from "./AllProducts";
import CartPage from "./CartPage"; // ✅ Import CartPage


function App() {
  return (


        <CustomerProductProvider>
      <ProductProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart Route */}
            </Routes>
          </Router>
        </AuthProvider>
      </ProductProvider>
    </CustomerProductProvider>


  );
}

export default App;

