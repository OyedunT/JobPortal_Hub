import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const ApplyJobForm = () => {
  const [cvFile, setCvFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams(); 

  const onSubmit = (data) => {
    if (!cvFile) {
      alert("Please upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile); // Append CV file

    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("jobId", id); // Append jobId
    // console.log({jobId});return;

    fetch("http://localhost:5000/api/job/apply-job", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Token handling
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert("Application submitted successfully!");
        } else {
          alert("Failed to submit the application.");
        }
        reset();
        setCvFile(null); // Clear CV file after submission
      })
      .catch((error) => {
        console.error("Error submitting job application: ", error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCvFile(file); // Set the selected CV file
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-4">
      {/* Form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">First Name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="create-job-input"
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                className="create-job-input"
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </div>
          </div>

          {/* 2nd Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="create-job-input"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Mobile Number</label>
              <input
                type="tel"
                {...register("mobileNumber", {
                  required: "Mobile Number is required",
                })}
                className="create-job-input"
              />
              {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
            </div>
          </div>

           {/* 3rd Row */}
           <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">House Address</label>
              <input
                type="text"
                {...register("houseAddress", {
                  required: "House Address is required",
                })}
                className="create-job-input"
              />
              {errors.houseAddress && (
                <span>{errors.houseAddress.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Gender</label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="create-job-input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span>{errors.gender.message}</span>}
            </div>
          </div>

          {/* 4th Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Age</label>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                className="create-job-input"
              />
              {errors.age && <span>{errors.age.message}</span>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Role Applied For</label>
              <input
                type="text"
                {...register("roleAppliedFor", {
                  required: "Role is required",
                })}
                className="create-job-input"
              />
              {errors.roleAppliedFor && (
                <span>{errors.roleAppliedFor.message}</span>
              )}
            </div>
          </div>

          {/* 5th Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Years of Relevant Experience
              </label>
              <input
                type="number"
                {...register("yearsExperience", {
                  required: "Experience is required",
                })}
                className="create-job-input"
              />
              {errors.yearsExperience && (
                <span>{errors.yearsExperience.message}</span>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">
                Monthly Salary Expectation (Net)
              </label>
              <input
                type="text"
                {...register("salaryExpectation", {
                  required: "Salary Expectation is required",
                })}
                className="create-job-input"
              />
              {errors.salaryExpectation && (
                <span>{errors.salaryExpectation.message}</span>
              )}
            </div>
          </div>

          {/* 6th Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="cv" className="custom-file-upload">
                <FaUpload />
                {cvFile ? "Change CV" : "Upload CV"}
              </label>
              <input
                id="cv"
                type="file"
                className="create-job-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {errors.cv && <span>{errors.cv.message}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="mt-4 block px-4 py-2 pl-4 border focus:outline-none bg-blue rounded text-white cursor-pointer font-semibold"
            value="Apply"
          />
        </form>
      </div>
    </div>
  );
};

export default ApplyJobForm;

