import React from "react";
import { useJobProgressContext } from "../../../context/Context";

const FolioCardHeader = ({folio, items}) => {
  const {showFormItem, setAlertDeleteDoc, setFormFolioShow, setFolioToUpdate, setItemToUpdate} = useJobProgressContext()

  function totalFolioOutturn() {
    return items?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.itemOutturn;
    }, 0);
  }

  const openFolioFormWithFolioToUpdate = ()=> {
      setFormFolioShow(true)
      setFolioToUpdate({folio})}

  
  return (
    <h4 className="card-header bg-colorFolio d-flex flex-wrap p-2">
      <div id="jobCardHeader_number&client" className="col-6 d-flex flex-wrap align-items-center ">
        <b className="col-12 fw-semiBold fs-1">{folio.folioNumber}</b>
        <div className="fw-light fs-5">{folio.folioConsignee}</div>
      </div>
      <div className="col-2 d-flex flex-column  align-items-center justify-content-between">
        <div className="">
            <button 
                onClick={()=>{
                    showFormItem(folio.id) 
                    setItemToUpdate()}} 
                className="btn btn-primary p-1">
                <img src="/icons/iconNewItem.svg"/>
            </button>
        </div>
        <div className="mt-1 fs-2 fw-semiBold">{items?.length}</div>
      </div>
      <div className="col-4 d-flex flex-column align-items-end justify-content-between">
        <div
          className="btn btn-primary bg-colorGrey1 d-block    fs-1  p-auto h-50"
          href="#"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           <img src="/icons/iconOptions.svg"  />
        </div>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <div onClick={openFolioFormWithFolioToUpdate} className="dropdown-item" href="#">
              Edit folio details
            </div>
          </li>
          {/* <li>
            <div className="dropdown-item" href="#">
              See details
            </div>
          </li> */}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <div className="dropdown-item" onClick={()=>setAlertDeleteDoc( {collection:"folios" , folio} )}>
              Delete folio
            </div>
          </li>
        </ul>
        <div className=' d-flex fs-2 '>
            <div className='fw-semiBold'>
             {totalFolioOutturn(folio) ? 
                (totalFolioOutturn(folio)===folio.folioManifest ? 
                    <img src={"/icons/iconDone.svg"}/> 
                    : 
                    (totalFolioOutturn(folio))) 
              : 0 }
            </div>
            <div>
                /
            </div>
            <div className='fw-light'>
                {folio.folioManifest}
            </div>
            
        </div>
      </div>
      
    </h4>
  );
};

export default FolioCardHeader;
