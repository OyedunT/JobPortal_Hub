import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import { url } from "../api/Index.js";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, verify it
      
          if (token) {
            // Token invalid/expired, navigate to login
            
            navigate(`/apply-job/${_id}`)
          } else {
            // Token valid, proceed to apply
            alert("Your session has expired. Please log in again.");
            navigate("/login");
          }
        }
    }

  const logoUrl = `${url}assets/logo/${companyLogo}`;

  return (
    <section className="card">
      <Link to={"/"} className="flex gap-4 flex-col sm:flex-row items-start">
        <img
          src={logoUrl}
          alt="logo"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin /> {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign /> {minPrice}-{maxPrice}
            </span>
            <span className="flex items-center gap-2">
              <FiBriefcase /> {salaryType}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar /> {postingDate}
            </span>
          </div>

          <p className="text-base text-primary/70 ">{description}</p>
        </div>
      </Link>

      {/* Apply Button */}
      <button
        onClick={handleApplyClick}
        className="mt-4 block px-4 py-2 pl-4 border focus:outline-none bg-blue rounded text-white cursor-pointer font-semibold"
      >
        Apply
      </button>
    </section>
  );
};

export default Card;
