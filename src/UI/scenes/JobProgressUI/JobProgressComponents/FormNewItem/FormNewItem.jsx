import React from "react";
import { useForm } from "react-hook-form";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

import { useJobProgressContext } from "../../../../../context/Context";

import Input from "../../../../../components/Input/Input";
import Modal from "react-bootstrap/Modal";

const FormNewItem = () => {
  const { formItemShow, hideFormItem, jobFolios } = useJobProgressContext();

  const folio = jobFolios.find((folio) => folio.id === formItemShow);
  const newFolioItemIdx = folio?.folioItems?.length + 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemOutturn: 1,
    },
  });


  const createItem = (itemData) => {
    const db = getFirestore();
    const updatedFolioItems = folio?.folioItems
      ? [
          ...folio.folioItems,
          {
            ...itemData,
            itemFromFolio: formItemShow,
            id: `${folio.id}_${newFolioItemIdx.toString()}`,
            idx: folio?.folioItems?.length
          },
        ]
      : [{ ...itemData, itemFromFolio: formItemShow, id: `${folio.id}_1`, idx:0 }];

    updateDoc(doc(db, "folios", formItemShow), {
      folioItems: updatedFolioItems,
    }).then(() => {
      folio.folioItems = updatedFolioItems;
      hideFormItem();
    });

    
  };

  return (
    <Modal size="sm" show={formItemShow} onHide={hideFormItem}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Add item to <p className="fs-1 d-inline">{formItemShow}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(createItem)} className="d-flex flex-wrap">
          <Input
            label="Outturn"
            type="number"
            name="itemOutturn"
            className="col-6"
            register={register}
            errors={errors}
            validations={[
              {
                type: "required",
                rule: true,
                errorMessege: "Folio number is required",
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
              },
            ]}
          />
          <div className="fs-1 fw-semiBold my-auto">
            / {folio?.folioManifest}
          </div>
          <div className="col-12">
            <select
              {...register("itemType", { required: true })}
              className="form-select form-select-lg fs-1 fw-semiBold"
            >
              <option value="SKID">SKID</option>
              <option value="CHEAP">CHEAP</option>
              <option value="CRATE">CRATE</option>
              <option value="ICB">ICB</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          <input
            className="btn btn-primary w-100 m-3 fs-1"
            type="submit"
            value="CREATE ITEM"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormNewItem;
