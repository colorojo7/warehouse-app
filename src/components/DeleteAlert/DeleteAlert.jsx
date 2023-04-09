import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import React from 'react'
import {useNavigate } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import { useJobProgressContext } from '../../context/Context';

const DeleteAlert = () => {
  const {alertDeleteDoc, setAlertDeleteDoc} = useJobProgressContext()

  const collection = Object.values(alertDeleteDoc)[0];
  const document = Object.values(alertDeleteDoc)[1];
  console.log(collection, document);
  const navigate = useNavigate();
  
  // agregar funcion que en el caso de que se este borrando un job que borre los folios 
  const deleteDocument = async (collectionName, docId) => {
    const db = getFirestore();
    const docRef = doc(db, collectionName, docId);  
    

    try {
      await deleteDoc(docRef);
      setAlertDeleteDoc(false)
     
      collectionName === "folios" && location.reload();
      collectionName === "jobs" && (navigate(`/jobList/`)
      );

      return `Document ${docId} succsesfully deleted from ${collectionName}`

    } catch (e) {
      console.error("Error al eliminar documento: ", e);
    }
  };


  return (
    <Modal
        size="sm"
        show={alertDeleteDoc}
        onHide={() => setAlertDeleteDoc(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          Delete Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='fs-4'>Are you sure you want to delete  {document.id} from { collection }</p>
          <div className='d-flex justify-content-between '>
            <button className='btn btn-danger fs-2 p-2 px-5' onClick={() => deleteDocument(collection, document.id )}> DELETE</button>
            <button className='btn btn-outline-primary fs-2 p-2 px-4'> CANCEL</button>
          </div> 
        </Modal.Body>
      </Modal>
  )
}

export default DeleteAlert