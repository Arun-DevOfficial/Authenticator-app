import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Navigator
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    // Sending the data to the server
    Axios.post("http://localhost:10000/login", data)
      .then((response) => {
        if (response.status === 200) {
          // Login successful
          console.log("Successfully User logged in.");
          toast.success("Successfully Logged In"); // Notification
          setTimeout(() => {
            navigate("/profile"); // Navigate to profile
          }, 3000);
        } else if (response.status === 400) {
          // Invalid user
          toast.error(response.data.Error);
        } else if (response.status === 404) {
          // Password not matched
          toast.error(response.data.Error);
        } else {
          // Unexpected error
          toast.error("An unexpected error occurred.");
        }
      })
      .catch((error) => {
        alert("Invalid user and password");
      });
  };

  return (
    <section className="bg-[#F8F9FB] min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow w-96 rounded-lg">
          <div>
            <img
              src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxiZWFjaCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=500"
              alt="ourprofile"
              className="h-48 w-full rounded-t-lg"
            />
          </div>
          <div className="p-10">
            <h1 className="font-light text-xl text-center">Log In</h1>
            <form action="#" className="mt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="font-light">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email"
                  className="border px-4 py-2 rounded-lg focus:outline-none focus:border focus:border-gray-400"
                  onChange={handleChange}
                  required
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label htmlFor="password" className="font-light">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  className="border px-4 py-2 rounded-lg focus:outline-none focus:border focus:border-gray-400"
                  onChange={handleChange}
                  required
                  autoComplete="false"
                />
              </div>
              <button className="bg-[#DA3605] px-4 py-2 w-full mt-8 text-white rounded-lg hover:shadow">
                Login
              </button>
              <p className="mt-6 text-center font-light">
                Not a member?{" "}
                <Link
                  to="/register"
                  className="pl-2 hover:text-[#DA3605] hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
