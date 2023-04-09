import React from "react";
import { useJobProgressContext } from "../../../../context/Context";

const FolioCardLine = ({ item, currentLocations=undefined }) => {
  const {setFormLocateShow, setFormItemShow, setItemToUpdate}=useJobProgressContext()

  return (
    <>
      <div className="d-flex justify-content-between m-1">
        <div className="col-2">
          <button
            onClick={() => console.log("opciones item")}
            className="btn btn-primary p-1 bg-colorGrey1 "
          >
            <img src="/icons/iconOptions.svg" />
          </button>
        </div>
        <div className="col-4 my-auto" onClick={()=> setFormLocateShow(item)}>
          {item.itemLocation ? 
            (item.itemLocation.text) 
            : 
            ( <button  className="btn btn-primary">
                <img src="/icons/iconLocation.svg" />
              </button>
            )
          }
        </div>
        <div className="col-3 my-auto" onClick={()=>{
            setFormItemShow(item.itemFromFolio) 
            setItemToUpdate(item)}
            }
            >{item.itemType}</div>
        <div className="col-1"></div>
        <div className="col-2 text-end my-auto"> {item.itemOutturn}</div>
      </div>
      <hr className="m-1" />
    </>
  );
};

export default FolioCardLine;
