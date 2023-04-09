import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {useNavigate } from "react-router-dom";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useJobProgressContext } from "../../../../context/Context";

import Input from "../../../../components/Input/Input";
import JobExistAlert from "../JobExistAlert/JobExistAlert";

const JobFormUnpack = () => {
  const [jobExist, setJobExist ]= useState(false)
  const {jobToUpdate} = useJobProgressContext()
  jobToUpdate && console.log("jobToUpdate",jobToUpdate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobNumber:jobToUpdate? jobToUpdate.id :"",
      jobClient:jobToUpdate? jobToUpdate.jobClient :"",
      jobContainerNumber:jobToUpdate? jobToUpdate.jobContainerNumber :"",
      jobContainerISO:jobToUpdate? jobToUpdate.jobContainerISO :"",
      jobCuttedSeal:jobToUpdate? jobToUpdate.jobCuttedSeal :"",
      jobTotalFolios: jobToUpdate? jobToUpdate.jobTotalFolios : 1,
      jobManifest: jobToUpdate? jobToUpdate.jobManifest: 1,
    }
  });

  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    const db = getFirestore();
    const docRef = doc(db, "jobs", data.jobNumber);
    
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setJobExist(data.jobNumber)
        //alert("A document with the same ID already exists");
        return;
      }
      
      await setDoc(docRef, { ...data, jobStart: Date() });
      navigate(`/jobProgress/${data.jobNumber}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onEdit = async (editedData) => {

    const db = getFirestore();
    const docRef = doc(db, "jobs", editedData.jobNumber);
  
    try {
      await updateDoc(docRef, {
        ...editedData,
      })
      .then(() => {
        navigate(`/jobProgress/${editedData.jobNumber}`);
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }



  return (
    <form onSubmit={jobToUpdate? handleSubmit(onEdit) : handleSubmit(onSubmit) }>
      <Input
        label="JOB NUMBER"
        type="text"
        name="jobNumber"
        disabled={jobToUpdate? true: false}
        register={register}
        errors={errors}
        validations={[
          {
            type: "required",
            rule: true,
            errorMessege: "Job number is required",
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
          }
        ]}
      />

      <Input
        label="CLIENT NAME"
        type="text"
        name="jobClient"
        register={register}
        errors={errors}
        validations={[]}
      />

      <hr />

      <Input
        label="CONTAINER NUMBER"
        type="text"
        name="jobContainerNumber"
        register={register}
        errors={errors}
        validations={[
          {
            type: "required",
            rule: true,
            errorMessege: "is required",
          },
          {
            type: "pattern",
            rule: /^[A-Z]{4}[0-9]{7}$/,
            errorMessege: 'Please enter a valid container number "ABCD1234567"',
          },
        ]}
      />

      <Input
        label="ISO CODE"
        type="text"
        name="jobContainerISO"
        register={register}
        errors={errors}
        validations={[
          {
            type: "required",
            rule: true,
            errorMessege: "is required",
          },
          {
            type: "pattern",
            rule: /^[0-9]{2}[0-9A-Z]{2}$/,
            errorMessege: 'Please enter a valid ISO number "22GR"',
          },
        ]}
      />

      <Input
        label="CUTTED SEAL "
        type="text"
        name="jobCuttedSeal"
        register={register}
        errors={errors}
        validations={[]}
      />

      <hr />

      <Input
        label="TOTAL MANIFEST"
        type="text"
        name="jobManifest"
        register={register}
        errors={errors}
        validations={[
          {
            type: "required",
            rule: true,
            errorMessege: "is required",
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
        label="TOTAL FOLIOS"
        type="text"
        name="jobTotalFolios"
        register={register}
        errors={errors}
        validations={[
          {
            type: "required",
            rule: true,
            errorMessege: "Is required",
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
      <div className="p-3">
        {jobExist && <JobExistAlert jobNumber={jobExist}/>  }
        <input className="btn btn-primary w-100" type="submit" value={jobToUpdate? "EDIT" : "START"} />
      </div>
    </form>
  );
};

export default JobFormUnpack;
