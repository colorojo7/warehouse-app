import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useJobProgressContext } from "../../../../../context/Context";

import Modal from "react-bootstrap/Modal";
import Input from "../../../../../components/Input/Input";

const FormNewFolio = () => {

  const {job, jobFolios, formFolioShow, setFormFolioShow, folioToUpdate} = useJobProgressContext()
  
  const [folioExist,setFolioExist] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: 
    {
      folioSeq: folioToUpdate ? folioToUpdate.folio.folioSeq : jobFolios.length + 1,
      folioNumber: folioToUpdate ? folioToUpdate.folio.folioNumber : "",
      folioManifest:folioToUpdate ? folioToUpdate.folio.folioManifest : "",
      folioConsignee:folioToUpdate ? folioToUpdate.folio.folioConsignee : ""
    },
  });

    const createFolio = async (folioData) => {
      const db = getFirestore();
      const docRef = doc(db, "folios", folioData.folioNumber);
    
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFolioExist(folioData.folioNumber)
          return;
        }
        await setDoc(docRef, {
          ...folioData,
          folioFromJob: job.id,
          folioCreated: Date(),
        }).then(()=>{
          setFormFolioShow(false);
        })
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  
    const updateFolio = async (folioData) => {
      const db = getFirestore();
      const docRef = doc(db, "folios", folioData.folioNumber);
    
      try {
        
    
        await updateDoc(docRef, {
          ...folioData,
        })
        .then(() => {
          setFormFolioShow(false)
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    };

  return (
    <Modal
      size="sm"
      show={formFolioShow}
      onHide={() => setFormFolioShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">FOLIO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={folioToUpdate? handleSubmit(updateFolio) :handleSubmit(createFolio)} className="d-flex flex-wrap ">
          <Input
            label="Seq"
            type="number"
            name="folioSeq"
            className="col-3"
            register={register}
            errors={errors}
            validations={[]}
          />
          <Input
            label="Folio Number"
            type="text"
            name="folioNumber"
            disabled={folioToUpdate? true: false}
            className={`col-8`}
            
            register={register}
            errors={errors}
            validations={[
              {
                type: "required",
                rule: true,
                errorMessege: "Folio number is required",
              },
              {
                type: "maxLength",
                rule: 8,
                errorMessege: "Min 5  & max 8 numbers",
              },
              {
                type: "minLength",
                rule: 5,
                errorMessege: "Min 5  & max 8 numbers",
              },
              {
                type: "pattern",
                rule: /^[0-9]+$/,
                errorMessege: "Numbers only",
              },
            ]}
          />
          <Input
            label="Manifest"
            type="number"
            name="folioManifest"
            className="col-12"
            register={register}
            errors={errors}
            validations={[
              {
                type: "required",
                rule: true,
                errorMessege: "Folio Manifest is required",
              },
              {
                type: "pattern",
                rule: /^[0-9]+$/,
                errorMessege: "Numbers only",
              },
              {
                type: "valueAsNumber",
                rule: true,
                errorMessege: "value as number error",
              }
            ]}
          />
          <Input
            label="Consignee"
            type="text"
            name="folioConsignee"
            className="col-12"
            register={register}
            errors={errors}
            validations={[]}
          />

          {folioExist && <p className="w-100 fs-2 m-3 d-flex flex-wrap justify-content-center alert alert-danger" 
            >Folio <strong className="mx-2"> {folioExist} </strong> already exist</p>}
         
         
          <input
            className="btn btn-primary w-100 m-3 fs-1"
            type="submit"
            value={folioToUpdate? "UPDATE FOLIO":"CREATE FOLIO"}
          />
          
          
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormNewFolio;
