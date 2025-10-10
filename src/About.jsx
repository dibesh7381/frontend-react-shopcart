import { useState, useEffect } from "react";
import Loader from "./Loader";

const About = () => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/about");
        const json = await res.json();
        setInfo(json);
      } catch (err) {
        console.log(err);
      }finally {
        setLoading(false); 
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <Loader/>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{info.message}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-lg text-gray-700">{info.data}</p>
      </div>
    </div>
  );
};

export default About;
