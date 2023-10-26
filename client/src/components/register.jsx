import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    // Sending the data to the server
    Axios.post("http://localhost:10000/register", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Successfully User registered.");
          toast.success("Successfully Registered");
          navigate("/profile");
        } else {
          // Handle specific server-side errors
          if (response.data && response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.error("An error occurred on the server.");
          }
        }
      })
      .catch((error) => {
        // Handle network errors
        console.error(error);
        toast.error("Network error. Please try again.");
      });
  };

  return (
    <>
      <section className="bg-[#F8F9FB] min-h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white shadow  w-96 rounded-lg">
            <div>
              <img
                src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxiZWFjaCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&w=500"
                alt="ourprofile"
                className="h-48 w-full rounded-t-lg"
              />
            </div>
            <div className="p-10 shadow-lg">
              <h1 className="font-light text-lg text-center">Sign Up</h1>
              <form action="#" className="mt-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="username" className="font-light">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    placeholder="Username"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:border focus:border-gray-400"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
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
                  />
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
                  <label htmlFor="confirm" className="font-light">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:border focus:border-gray-400"
                    onChange={handleChange}
                    value={data.confirm}
                    required
                  />
                </div>

                <button className="bg-[#DA3605] px-4 py-2 w-full mt-8 text-white rounded-lg hover:shadow">
                  Sign Up
                </button>
                <p className="mt-4 text-center font-light">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="pl-2 hover:text-[#DA3605] hover:underline"
                  >
                    Login?
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
