import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [userData, setData] = useState({
    age: "",
    gender: "",
    dob: "",
    mobile: "",
  });

  //Navigator

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending the data to the server
    axios
      .post("http://localhost:4040/profile", userData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Successfully User registered.");
          toast.success("Successfully Processed.."); // Notification
        }
        if (response.status === 400) {
          return toast.error("Please Provide a Valid Data");
        }
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
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
            <div className="flex justify-between items-center">
              <h1 className="font-light text-lg">Profile</h1>
            </div>
            <form action="#" className="mt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="age" className="font-light">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  value={userData.age}
                  placeholder="Enter your age"
                  className="border px-4 py-2 rounded-lg capitalize focus:outline-none focus:border focus:border-gray-400"
                  onChange={handleChange}
                  required
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label htmlFor="gender" className="font-light">
                  Gender
                </label>
                <select
                  name="gender"
                  value={userData.gender}
                  className="focus:outline-none focus:border focus:border-gray-400 border px-4 py-2 rounded-lg"
                  onChange={handleChange}
                  required
                  autoComplete="false"
                >
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">FeMale</option>
                  <option value="transgender">transgender</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label htmlFor="dob" className="font-light">
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  placeholder="Enter your Date Of Birth"
                  className="border px-4 py-2 rounded-lg capitalize focus:outline-none focus:border focus:border-gray-400"
                  onChange={handleChange}
                  required
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-4 mb-4">
                <label htmlFor="confirm password" className="font-light">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile no / Phone"
                  className="border px-4 py-2 rounded-lg capitalize focus:outline-none focus:border focus:border-gray-400"
                  onChange={handleChange}
                  value={userData.confirm}
                  required
                  autoComplete="false"
                />
              </div>
              <div className="flex justify-around mt-10 items-center">
                <button className="bg-[#DA3605] text-white px-4 py-1 rounded-lg w-[100px]">
                  Update
                </button>
                <Link
                  to="/"
                  className="bg-[#DA3605] w-[110px] py-2 px-5 rounded-lg"
                >
                  <FaArrowRightFromBracket
                    color="white"
                    className="w-full mx-auto"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
