import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [selectedUserType, setSelectedUserType] = useState(""); // Employee or Company
  // const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          FullName: data.fullName,
          UserName: data.username,
          Email: data.email,
          Password: data.password,
          UserType: selectedUserType,
        }),
      });
  
      if (response.ok) {
        // alert("Signup Successful! Redirecting to Login...");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Signup error response:", errorData); // Log the error response
        alert(`Signup failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };
  
      
  

  // Function to handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <h2 className="text-2xl font-bold mb-8">Sign Up!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Full Name</label>
              <input
                type="text"
                {...register("fullName", { required: true })}
                className="create-job-input"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500">Full Name is required</p>}
            </div>
          </div>

          {/* Username */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Username</label>
              <input
                type="text"
                {...register("username", { required: true })}
                className="create-job-input"
                placeholder="Choose a username"
              />
              {errors.username && <p className="text-red-500">Username is required</p>}
            </div>
          </div>

          {/* Email */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="create-job-input"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500">Email is required</p>}
            </div>
          </div>

          {/* Password */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="create-job-input"
                placeholder="Create a password"
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
          </div>

          {/* User Type Dropdown */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">User Type</label>
              <select
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                className="create-job-input"
              >
                <option value="">Select User Type</option>
                <option value="employee">Employee</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          {/* Conditional Fields for Company */}
          {selectedUserType === "company" && (
            <div className="auth-flex">
              <div className="w-full">
                <label className="block mb-2 text-lg">Company Name</label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="create-job-input"
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-500">Company Name is required</p>}
              </div>
            </div>
          )}

          {/* Profile Picture Upload */}
          {/* <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Profile Picture</label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="create-job-input"
                onChange={handleImageChange}
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
