import React from 'react'
import { useJobProgressContext } from '../../../../../context/Context'

const JobProgressButtons = () => {
  const { setFormFolioShow, setFormDamageShow, setFolioToUpdate} =useJobProgressContext()
  const showFormFolio = () => {
    setFormFolioShow(true)
    setFolioToUpdate(undefined)
  }
  const showFormDamage = () => {setFormDamageShow(true)}


  return (
    <div className='sticky-bottom bottom-0 w-100  bg-colorWhite p-2 d-flex justify-content-evenly'>
        <div className='col-6 btn btn-outline-danger p-2 me-1 fs-3 fw-semiBold'
            onClick={showFormDamage}
            > NEW DAMAGE
        </div>
        <div className='col-6 btn btn-primary p-2 ms-1 fs-3 fw-semiBold'
            onClick={showFormFolio}
            >NEW FOLIO
        </div>
    </div>
  )
}

export default JobProgressButtons