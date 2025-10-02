import { useState, useEffect } from "react";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/home");
        const json = await res.json();
        setContent(json); // backend me data field me content aa raha hai
      } catch (err) {
        console.log(err);
      }
    };
    fetchHome();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{content.message}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-lg text-gray-700">{content.data}</p>
      </div>
    </div>
  );
};

export default Home;
