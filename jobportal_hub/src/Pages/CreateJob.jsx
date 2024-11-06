import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FaUpload } from "react-icons/fa";
// import { post } from "../api";

const CreateJob = () => {
  const [selectedOption, setSeletedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(null);

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "CSS", label: "CSS" },
    { value: "HTML5", label: "HTML5" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Redux", label: "Redux" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Java", label: "Java" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;

    const formData = new FormData();
    // formData.append('companyLogo', data.companyLogo[0]); // Append the file
    formData.append("companyLogo", value);

    // Append other form data if needed
    for (const key in data) {
      if (key !== "companyLogo") {
        formData.append(key, data[key]);
      }
    }

    //     for (const key of formData) {
    //       console.log(key);

    //     }
    // return;
    // post("post-job", formData, (result) => {
    //   console.log(result);
    //   if (result.acknowledge === true) {
    //   alert("Job Posted Successfully!!!")
    //   }
    //   reset()
    // })

    fetch("http://localhost:5000/api/job/post-job", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result.acknowledge === true) {
          alert("Job Posted Successfully!!!");
        }
        reset();
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });

   
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue(file);
    }
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-4">
      {/* Form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Salary Type</label>
              <select {...register("salaryType")} className="create-job-flex">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2024-10-28"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-flex"
              >
                <option value="">Select Your Experience Level</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
                <option value="Any experience">Any experience</option>
              </select>
            </div>
          </div>

          {/* 5th Row */}
          <div className="create-job-flex">
            <label className="block mb-2 text-lg"> Required Skill Sets:</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSeletedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* 6th Row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg"> Company Logo</label>
              <input
                id="companyLogo"
                type="file"
                placeholder="Paste your comapy logo "
                {...register("companyLogo")}
                className="create-job-input"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="companyLogo" className="custom-file-upload">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected Logo"
                    className="upload-icon"
                  />
                ) : (
                  <img
                    src="../../public/images/logo.jpg"
                    alt="Upload Icon"
                    className="upload-icon"
                  />
                )}
              </label>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-flex"
              >
                <option value="">Select Your Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th Row */}
          <div className="w-full">
            <label className="block mb-2 text-lg"> Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              row={6}
              defaultValue={
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit velit explicabo nulla."
              }
              placeholder="Job Description"
              {...register("description")}
            />
          </div>

          {/* Last Row */}
          <div className="w-full">
            <label className="block mb-2 text-lg"> Job Posted By</label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("companyEmail")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="block mt:12 bg-blue text-white font semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
