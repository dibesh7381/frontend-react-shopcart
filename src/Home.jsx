import { useState, useEffect } from "react";
import Loader from "./Loader"; // 👈 apna loader import kar

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/home");
        const json = await res.json();
        setContent(json); // backend me { message, data } aa raha hai
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ✅ stop loader after fetch
      }
    };
    fetchHome();
  }, []);

  if (loading) return <Loader />; // ✅ loader show in center

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {content?.message}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-lg text-gray-700">{content?.data}</p>
      </div>
    </div>
  );
};

export default Home;
