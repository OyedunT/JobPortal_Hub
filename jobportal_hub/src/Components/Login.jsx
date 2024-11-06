import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        Email: data.email,  
        Password: data.password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        navigate("/apply-job");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <h2 className="text-2xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="auth-flex">
            <div className="w-full">
              <label className="block mb-2 text-lg">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="create-job-input"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
