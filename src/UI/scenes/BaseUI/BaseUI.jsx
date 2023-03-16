import React from 'react'
import { Link } from 'react-router-dom'

const BaseUI = () => {

  return (
      <>
         <div>
            <img src="" alt="" />
         </div>
         <div className="d-flex flex-wrap  position-absolute bottom-0 w-100 p-2 ">
            <Link to="/jobList" className='col-12 my-1 btn btn-outline-primary fs-1 fw-semiBold'>
               Jobs
            </Link>

            <Link to="/folioList" className='col-12 my-1 btn btn-outline-primary fs-1 fw-semiBold'>
               Folios
            </Link>

            <Link to="/jobForm" className=' col-12 my-1 btn btn-primary fs-1 fw-semiBold'>
               NEW JOB
            </Link>
         </div>
      </>
  )
}

export default BaseUI