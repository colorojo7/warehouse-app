import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import JobCard from '../../../../components/JobCard/JobCard'
import { useJobProgressContext } from '../../../../context/Context'


const JobList = () => {
    const [jobs, setJobs]=useState([])
  

    useEffect(()=>{
  
      const db = getFirestore()
        const queryCollection = collection (db, 'jobs' )
      getDocs(queryCollection)
        .then( res  => setJobs( res.docs.map( job => ( {id : job.id , ...job.data() } ) ) )) 
          .catch(err  =>  console.log("error", err)) 
  },[])
  
  return (
    <div className=''>
        {jobs.map(job => <JobCard key={job.id} job={job} /> )}
    </div>
  )
}   

export default JobList