import React from "react";
import InputField from "../Components/InputField";

const Location = ({ handleChange }) => {
  const locations = [
    { title: "All", value: "" },
    { title: "Boston", value: "boston" },
    { title: "London", value: "london" },
    { title: "Madrid", value: "madrid" },
    { title: "Nigeria", value: "nigeria" },
    { title: "San Francisco", value: "san francisco" },
    { title: "Seattle", value: "seattle" },
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        {locations.map((loc) => (
          <label key={loc.value} className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              value={loc.value}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            {loc.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Location;
