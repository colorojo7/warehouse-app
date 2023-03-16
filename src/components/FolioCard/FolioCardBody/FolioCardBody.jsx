import React from 'react'
import FolioCardLine from './FolioCardLine/FolioCardLine';
import FolioItemsGroup from './ItemsGroup/FolioItemsGroup';

const FolioCardBody = ({folioItems}) => {

  
  const groupItemsByLocation = (items) => {
    const itemsWithoutLocation = [];
    const itemsByLocation = {};
  
    if (!Array.isArray(items)) {
      return {
        itemsWithoutLocation: itemsWithoutLocation,
        itemsByLocation: itemsByLocation
      };
    }
    items.forEach((item) => {
      const { itemLocation } = item;
      if (!itemLocation || !itemLocation.text) {
        itemsWithoutLocation.push(item);
      } else {
        const locationText = itemLocation.text;
        if (!itemsByLocation[locationText]) {
          itemsByLocation[locationText] = [item];
        } else {
          itemsByLocation[locationText].push(item);
        }
      }
    });
  
    return {
      itemsWithoutLocation,
      itemsByLocation,
    };
  };
  
  const { itemsWithoutLocation, itemsByLocation } = groupItemsByLocation(folioItems);



  if (!Array.isArray(folioItems)) {
      return <p className='p-2'>NO ITEMS</p>; // or return a message to indicate the error
    }

  return (
    
    <div className="card-body p-0 fs-5">
        {itemsWithoutLocation.map( (item, idx) => <FolioCardLine key={idx} item={item} />)}
        <FolioItemsGroup  locatedItems={itemsByLocation}/>
    </div>
  )
}

export default FolioCardBody