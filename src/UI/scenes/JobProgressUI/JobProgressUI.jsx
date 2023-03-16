import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore, query, getDocs, where, collection, getDoc, doc } from 'firebase/firestore'

import { useJobProgressContext } from '../../../context/Context'
import JobProgressHeader from './JobProgressComponents/JobProgressHeader/JobProgressHeader'
import JobFoliosList from './JobProgressComponents/JobFoliosList/JobFoliosList'
import JobProgressButtons from './JobProgressComponents/JobProgressButtons/JobProgressButtons'
import FormNewFolio from './JobProgressComponents/FormNewFolio/FormNewFolio'
import FormNewItem from './JobProgressComponents/FormNewItem/FormNewItem'
import FormDamage from './JobProgressComponents/FormDamage/FormDamage'
import FormLocateItem from './JobProgressComponents/FormLocateItem/FormLocateItem'



const JobProgressUI = () => {
  const {jobNumber} =useParams()

  const {setJobFolios, setJob, job, formFolioShow ,formItemShow, formLocateShow, formDamageShow} =useJobProgressContext()
  
useEffect(()=>{ 
  const db = getFirestore()

  getDoc(doc(db , 'jobs', jobNumber ))
    .then (res=>setJob( {id : res.id , ...res.data() } ))
    .catch(err=>console.log(err))
}, [jobNumber])

useEffect(() => {
  if (!job.id) return; // espera a que se cargue el trabajo

  const db = getFirestore();
  getDocs(
    query(
      collection(db, 'folios'), 
      where('folioFromJob', '==', jobNumber) // solo muestra folios relacionados con este trabajo
    )
  )
  .then(res => setJobFolios(res.docs.map(folio=>({id:folio.id,...folio.data()}))))
  .catch(err => console.log(err)) 

}, [job]);

  return (

    <div>
      <JobProgressHeader/>
      <JobFoliosList/>
      <JobProgressButtons/>

      {formFolioShow && <FormNewFolio />}
      {formItemShow  && <FormNewItem />}
      {formLocateShow && <FormLocateItem />}
      {formDamageShow&& <FormDamage />}
    </div>
  )
}

export default JobProgressUI