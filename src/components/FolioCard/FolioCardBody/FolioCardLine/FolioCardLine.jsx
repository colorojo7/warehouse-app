import React from "react";
import { useJobProgressContext } from "../../../../context/Context";

const FolioCardLine = ({ item }) => {
  const {setFormLocateShow}=useJobProgressContext()
  
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
        <div className="col-3">
          {item.itemLocation ? 
            (item.itemLocation.text) 
            : 
            ( <button onClick={()=> setFormLocateShow(item.id)} className="btn btn-primary">
                <img src="/icons/iconLocation.svg" />
              </button>
            )
          }
        </div>
        <div className="col-3 my-auto">{item.itemType}</div>
        <div className="col-2"></div>
        <div className="col-2 text-end"> {item.itemOutturn}</div>
      </div>
      <hr className="m-1" />
    </>
  );
};

export default FolioCardLine;
