import { useState, useEffect } from "react";

const About = () => {
  const [info, setInfo] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/about");
        const json = await res.json();
        setInfo(json); // backend me data field me about info aa raha hai
      } catch (err) {
        console.log(err);
      }
    };
    fetchAbout();
  }, []);

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
