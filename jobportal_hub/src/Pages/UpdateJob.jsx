import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { url } from '../api/Index';

const UpdateJob = () => {
const {id} =  useParams();
const navigate = useNavigate();
// console.log(id);

const {_id, jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel,
  employmentType, description, companyLogo, postedBy, skills} = useLoaderData()

  const [selectedOption, setSeletedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(null);

  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue(file); 
    }
  };

  const onSubmit = (data) => {
    data.skills = selectedOption;

    const formData = new FormData();
    // formData.append('companyLogo', data.companyLogo[0]); // Append the file
    value !== null ? formData.append('companyLogo', value) : formData.append('companyLogo', companyLogo) ;

    // Append other form data if needed
    for (const key in data) {
      if (key !== 'companyLogo') {
        formData.append(key, data[key]);
      }
    }

//     for (const key of formData) {
//             console.log(key);
            
//           }
// return;
    fetch(`http://localhost:5000/update-job/${id}`, {
      method: "PATCH",
      // headers: {'content-type':'application/json'},
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log({result});
        if (result.acknowledged === true) {
          alert("Job Updated Successfully!!!");
          // redirect to home
          navigate("/");

        }
        // reset()
      });
      
  };
  
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

  
  const logoUrl = `${url}assets/logo/${companyLogo}`;
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
              defaultValue={jobTitle}
              {...register("jobTitle")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg"> Company Name</label>
            <input
              type="text"
              placeholder="Ex: Microsoft"
              defaultValue={companyName}
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
              defaultValue={minPrice}
              {...register("minPrice")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg"> Maximum Salary</label>
            <input
              type="text"
              placeholder="$120k"
              defaultValue={maxPrice}
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
              <option value={salaryType}>{salaryType}</option>
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
              defaultValue={jobLocation}
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
              defaultValue={postingDate}
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
              <option value={experienceLevel}>{experienceLevel}</option>
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
            defaultValue={skills}
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
              style={{display: 'none'}}
              onChange={handleImageChange}
            />
            <label htmlFor="companyLogo" className="custom-file-upload">
            {selectedImage ? (
                <img src={selectedImage} alt="Selected Logo" className="upload-icon" />
              ) : (
                <img src={logoUrl} alt="Upload Icon" className="upload-icon" />
              )}
            </label>
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Employment Type</label>
            <select
              {...register("employmentType")}
              className="create-job-flex"
            >
              <option value={employmentType}>{employmentType}</option>
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
            defaultValue={description}
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
            defaultValue={postedBy}
            {...register("postedBy")}
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
  )
}

export default UpdateJob