import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobProgressContext } from '../../../../../context/Context'

const JobProgressHeader = () => {
    const {job, totalFoliosManifest, currentOutturn, setAlertDeleteDoc, setJobToUpdate} = useJobProgressContext()
    const navigate = useNavigate()
    
    
  return (
    <div className='sticky-top  d-flex flex-wrap p-2 bg-colorJob align-items-center justify-content-between' style={{zIndex:100}}>
        <div className=''>
            <div className='fs-2 fw-semiBold'>
                {job.id}
            </div>
            <div className='fw-light'>
                {job.jobClient}
            </div>
        </div>
        {/* <div className=''>
            <div className='btn btn-outline-secondary bg-colorGrey1'>
                ... boton
            </div>   
        </div> */}
        <div className="col-4 d-flex flex-column align-items-end justify-content-between">
        <div
          className="btn btn-primary bg-colorGrey1 d-block    fs-1  p-auto h-50"
          href="#"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           <img src="/icons/iconOptions.svg"  />
        </div>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <div onClick={()=>
                  {setJobToUpdate(job)
                    navigate('/JobForm/')
                  }
                } 
                className="dropdown-item" href="#">
              Edit Job details
            </div>
          </li>
          {/* <li>
            <div className="dropdown-item" href="#">
              See Job details
            </div>
          </li> */}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <div className="dropdown-item" onClick={()=>setAlertDeleteDoc( {collection:"jobs" , job })}>
              Delete Job
            </div>
          </li>
        </ul>
      </div>



        <div className=' d-flex fs-2 p-1 '>
            <div className='fw-semiBold'>
                {currentOutturn()}
            </div>
            <div className=' mx-1 '>
                /
            </div>
            <div className={`${ totalFoliosManifest===job.jobManifest && 'bg-success bg-opacity-75 colorWhite rounded px-1'}`}>
                {job.jobManifest}
            </div>
            
        </div>
    </div>
  )
}

export default JobProgressHeader