import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center h-[720px]">
        <h1 className="font-semibold text-4xl">Welcome To <span className="text-emerald-500">Guvi</span></h1>
        <p className="mb-12 mt-4 font-light text-md">Kindly click any option to join in our team.</p>
        <div className="flex space-x-12">
          <Link to="/register" className="shadow px-8 py-2 hover:bg-emerald-500 hover:text-white rounded-md">Sign In</Link>
          <Link to="/Login" className="shadow px-8 py-2 hover:bg-gray-100">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
