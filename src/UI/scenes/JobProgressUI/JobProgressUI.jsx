import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore, query, getDocs, where, collection, getDoc, doc, orderBy, onSnapshot } from 'firebase/firestore'

import { useJobProgressContext } from '../../../context/Context'
import JobProgressHeader from './JobProgressComponents/JobProgressHeader/JobProgressHeader'
import JobFoliosList from './JobProgressComponents/JobFoliosList/JobFoliosList'
import JobProgressButtons from './JobProgressComponents/JobProgressButtons/JobProgressButtons'
import FormNewFolio from './JobProgressComponents/FormNewFolio/FormNewFolio'
import FormNewItem from './JobProgressComponents/FormNewItem/FormNewItem'
import FormDamage from './JobProgressComponents/FormDamage/FormDamage'
import FormLocateItem from './JobProgressComponents/FormLocateItem/FormLocateItem'
import DeleteAlert from '../../../components/DeleteAlert/DeleteAlert'



const JobProgressUI = () => {
  const {jobNumber} =useParams()

  const {setJobFolios, setJob, job, formFolioShow ,formItemShow, formLocateShow, formDamageShow, alertDeleteDoc, folioToUpdate} =useJobProgressContext()
  
useEffect(()=>{ 
  const db = getFirestore()

  getDoc(doc(db , 'jobs', jobNumber ))
    .then (res=>setJob( {id : res.id , ...res.data() } ))
    .catch(err=>console.log(err))
}, [jobNumber])


useEffect(() => {
  if (!job.id) return; // espera a que se cargue el trabajo

  const db = getFirestore();
  const foliosQuery = query(
    collection(db, 'folios'), 
    orderBy('folioSeq', 'asc' ), 
    where('folioFromJob', '==', jobNumber), // solo muestra folios relacionados con este trabajo
  );

  const unsubscribe = onSnapshot(foliosQuery, (querySnapshot) => {
    setJobFolios(
      querySnapshot.docs.map((folio) => ({ id: folio.id, ...folio.data() }))
    );
  });

  return () => {
    unsubscribe();
  };
}, [job]);


  return (

    <div>
      <JobProgressHeader/>
      <JobFoliosList/>
      <JobProgressButtons/>

      {formFolioShow && <FormNewFolio existingFolio={folioToUpdate} />}
      {formItemShow  && <FormNewItem />}
      {formLocateShow && <FormLocateItem />}
      {formDamageShow&& <FormDamage />}
      {alertDeleteDoc && <DeleteAlert/>}

    </div>
  )
}

export default JobProgressUI