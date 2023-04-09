import React from 'react'
import DeleteAlert from '../../../components/DeleteAlert/DeleteAlert'
import { useJobProgressContext } from '../../../context/Context'
import JobList from './JobList/JobList'

const JobListUI = () => {
  const {alertDeleteDoc}=useJobProgressContext()
 
  return (
    <>
      <div className='p-1 w-100'>
        <JobList/>
      </div>
      {alertDeleteDoc && <DeleteAlert/>}
    </>
  )
}

export default JobListUI