import React from "react";
import { useForm } from "react-hook-form";

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useJobProgressContext } from "../../../../../context/Context";

import Modal from "react-bootstrap/Modal";
import Input from "../../../../../components/Input/Input";

const FormNewFolio = () => {
  const {job, jobFolios, formFolioShow, setFormFolioShow} = useJobProgressContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folioSeq: jobFolios.length + 1
    },
  });
  const createFolio = (folioData) => {
    
    const db = getFirestore();
    setDoc(doc(db, "folios", folioData.folioNumber), {
      ...folioData,
      folioFromJob: job.id,
      folioCreated: Date(),
    })
    .then(()=>{
      jobFolios.push({...folioData, id: folioData.folioNumber});
      setFormFolioShow(false);
    })
    .catch((err) => console.log(err));
  };

  return (
    <Modal
      size="sm"
      show={formFolioShow}
      onHide={() => setFormFolioShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">FOLIO FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(createFolio)} className="d-flex flex-wrap ">
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
            className="col-8"
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
          <input
            className="btn btn-primary w-100 m-3 fs-1"
            type="submit"
            value="CREATE FOLIO"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormNewFolio;
