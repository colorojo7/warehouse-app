import {
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input/Input";

const JobFormUnpack = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTotalFolios: 1,
      jobManifest: 1,
    }
  });

  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    const db = getFirestore();
    setDoc(doc(db, "jobs", data.jobNumber), 
              { ...data, jobStart: Date() })
            .then(navigate(`/jobProgress/${data.jobNumber}`)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="JOB NUMBER"
        type="text"
        name="jobNumber"
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
        <input className="btn btn-primary w-100" type="submit" value="START" />
      </div>
    </form>
  );
};

export default JobFormUnpack;
