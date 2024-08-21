import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmpolymentType from './EmpolymentType'

const Sidebar = ({handleChange, handleClick}) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bond mb-2'>Filters</h3>

      <Location handleChange={handleChange}/>
      <Salary handleChange={handleChange} handleClick={handleClick}/>
      <JobPostingData handleChange={handleChange}/>
      <WorkExperience handleChange={handleChange}/>
      <EmpolymentType handleChange={handleChange}/>
       
    </div>
  )
}

export default Sidebar