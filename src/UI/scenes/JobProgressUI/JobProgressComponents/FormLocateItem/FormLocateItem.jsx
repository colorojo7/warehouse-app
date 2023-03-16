import React, { useEffect } from 'react'
import { useJobProgressContext } from '../../../../../context/Context'
import { useForm } from 'react-hook-form';

import Modal from 'react-bootstrap/Modal';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const FormLocateItem = () => {
    const {formLocateShow, setFormLocateShow, jobFolios} = useJobProgressContext()
    
    const folio = jobFolios.find((folio) => folio.id === formLocateShow.substring(0, formLocateShow.indexOf("_")));
    const item = folio.folioItems?.find((i)=> i.id===formLocateShow) 

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm({
        defaultValues: {
          Main: 'WAREHOUSE',
          Rack:''
        },
      });
      
      const locationMain = watch('Main')       
      
      const locateItem = (location) => {
        let whLocation 
        if (locationMain === "WAREHOUSE") {
                whLocation =  `${watch('Section')}${watch('RowDecen')}${watch('RowUnit')}${watch('Rack')}`
        }
        const updatedItem = {...item, itemLocation:{ ...location,  text: whLocation? whLocation : locationMain }}

        const updatedFolioItems = [...folio.folioItems.filter(items=> items.idx !==item.idx) , updatedItem] 
        
        const db = getFirestore();
        updateDoc(doc(db, "folios", folio.id), {
            folioItems: updatedFolioItems
        }).then(()=>{
            folio.folioItems = updatedFolioItems;
            setFormLocateShow(false)})  
        }

      useEffect(() => {
        if (locationMain === "WAREHOUSE") {
            register("Section", { required: true })
            register("RowDecen", { required: true })
            register("RowUnit", { required: true })
            register("Rack", { required: true })
            
        } else {
            unregister("Section")
            unregister("RowDecen")
            unregister("RowUnit")
            unregister("Rack")
        }
    }, [locationMain, register, unregister])

    return (
        <Modal
            size="sm"
            show={formLocateShow}
            onHide={() => setFormLocateShow(false)}   
          >
            <Modal.Header closeButton className=''>
              <Modal.Title id="example-modal-sizes-title-sm">
                <div className='text-center'>LOCATE</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex border mb-1 align-items-center'>
                    <div className='col-5 fs-1 text-center'>{item.itemType}</div>
                    <div className='col-7 d-flex flex-wrap bg-colorFolio text-center fs-1'>
                        <div className='col-12'>{folio.id}</div>
                        <div className='col-12'>{folio.folioConsignee}</div>
                        <div className='col-12'>{item.itemOutturn}/{folio.folioManifest}</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(locateItem)} className="d-flex flex-wrap ">
                    <div className="col-12">
                        <select
                        {...register("Main", { required: true })}
                        className="form-select form-select-lg w-100 fs-1 "
                        >
                            <option value="WAREHOUSE">WAREHOUSE</option>
                            <option value="FRONT OFFICE">FRONT OFFICE</option>
                            <option value="CUSTOMS">CUSTOMS</option>
                            <option value="AQUIS">AQUIS</option>
                            <option value="WASH BAY">WASH BAY</option>
                            <option value="LCL RANK">LCL RANK</option>
                            <option value="FRONT AWNING">FRONT AWNING</option>
                        </select>
                    </div>
                    
                            {locationMain === "WAREHOUSE" &&  (
                                <div className="col-12 d-flex fs-1 my-3">
                                    <div className="col-3">
                                        <select
                                        {...register("Section", { required: true })}
                                        className="form-select form-select-lg fs-1 fw-semiBold"
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                        </select>                                       
                                    </div>
                                    <div className="col-3">
                                        <select
                                        {...register("RowDecen", { required: true })}
                                        className="form-select form-select-lg fs-1 fw-semiBold"
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>                                       
                                    </div>
                                    <div className="col-3">
                                        <select
                                        {...register("RowUnit", { required: true })}
                                        className="form-select form-select-lg fs-1 fw-semiBold"
                                        >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            
                                        </select>                                       
                                    </div>
                                    <div className="col-3">
                                        <select
                                        {...register("Rack", { required: false })}
                                        className="form-select form-select-lg fs-1 fw-semiBold" 
                                        >
                                            <option value="">-</option>
                                            <option value="F">F</option>
                                            <option value="B">B</option>
                                            <option value="M">M</option>
                                            <option value="T">T</option>
                                        </select>                                       
                                    </div>
                                </div>
                            )}
                    
                    <input
                        className="btn btn-primary w-100 m-3 fs-1"
                        type="submit"
                        value="LOCATE ITEM"
                    />
                </form>    
            </Modal.Body>
          </Modal>
      )
}

export default FormLocateItem

