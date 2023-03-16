import React from 'react'
import FolioCardBody from './FolioCardBody/FolioCardBody';
import FolioCardHeader from './FolioCardHeader/FolioCardHeader'

const FolioCard = ({folio}) => {
  
  return (
    <div  id={folio.id} className="card flex-grow-1 my-3 mx-2 p-0 shadow">
      <FolioCardHeader folio={folio}/>
     
      <FolioCardBody folioItems={folio.folioItems}/>
  
    </div >
  )
}

export default FolioCard