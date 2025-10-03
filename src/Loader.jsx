import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-14 h-14">
        {/* Outer Ring */}
        <div className="absolute w-full h-full border-4 border-yellow-500 rounded-full animate-spin border-t-transparent"></div>

        {/* Inner Ring */}
        <div className="absolute w-10 h-10 top-2 left-2 border-4 border-indigo-500 rounded-full animate-spin border-b-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
