import React, { useState } from 'react'
import { useJobProgressContext } from '../../../../context/Context';
import FolioCardLine from '../FolioCardLine/FolioCardLine';

const FolioItemsGroup = ({locatedItems}) => {
    //const {setFormLocateShow}=useJobProgressContext()  => Para usar cuando modifique location de un grupo de items. 
    const [displeyItems, setDispleyItems] = useState(false)
    const openItemsDetail = ()=>{
        setDispleyItems(!displeyItems)
    }
    
    
  return (
    <>
        {Object.entries(locatedItems).map(([location, items]) => (
            <div key={location}>   
                <div  className="d-flex align-items-center border border-warning border-2 bg-warning bg-gradient bg-opacity-25 p-1">
                    <div className="col-1" onClick={openItemsDetail}><img src='/icons/iconDispley.svg'/></div>
                    <div className="col-5 fw-semiBold fs-2" onClick={()=>console.log("multiple location Change")}>{location}</div>
                    <div className="col-2 fw-semiBold fs-2 text-center">{items.length}</div>
                    <div className="col-4 fw-semiBold fs-2 text-end pe-1">{items.reduce((acc, item )=> acc+ item.itemOutturn, 0)}</div>   
                </div>
                <div>
                    {displeyItems && items.map( (item, idx) => <FolioCardLine key={idx} item={item} />)}
                </div>
            </div>
            ))}
        
    </>
  )
}

export default FolioItemsGroup