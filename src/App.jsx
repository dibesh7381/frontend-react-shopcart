import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";
import BecomeSeller from "./BecomeSeller";
import SellerDashboard from "./SellerDashboard";

function App() {
  return (
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
