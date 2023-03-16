import React from 'react'
import { useJobProgressContext } from '../../../../../context/Context'

const JobProgressHeader = () => {
    const {job, totalFoliosManifest, currentOutturn} = useJobProgressContext()
    

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
        <div className=''>
            <div className='btn btn-outline-secondary bg-colorGrey1'>
                ...
            </div>   
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