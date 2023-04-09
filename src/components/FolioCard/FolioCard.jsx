import { collection, doc, getFirestore, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import FolioCardBody from './FolioCardBody/FolioCardBody';
import FolioCardHeader from './FolioCardHeader/FolioCardHeader'

const FolioCard = ({folio}) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const db = getFirestore();
    const folioRef = doc(db, 'folios', folio.id);
    const itemsQuery = query(
      collection(folioRef, 'items'),
    );

    const unsubscribe = onSnapshot(itemsQuery, (querySnapshot) => {
      setItems(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, [folio]);

 

  return (
    <div  id={folio.id} className="card flex-grow-1 my-3 mx-2 p-0 shadow">
      <FolioCardHeader folio={folio} items={items}/>
     
      <FolioCardBody folioItems={items}/>
  
    </div >
  )
}

export default FolioCard