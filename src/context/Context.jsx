import { useState, createContext, useContext } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const JobProgressContext = createContext([]);

export const useJobProgressContext = () => useContext(JobProgressContext);

export const JobProgressContextProvider = ({ children }) => {
 
  const [job, setJob]=useState({})
  const [jobFolios, setJobFolios] = useState([]);
  const [folioItems, setFolioItems]= useState([])

  const [formFolioShow, setFormFolioShow] = useState(false);
  const [formDamageShow, setFormDamageShow] = useState(false);
  const [formItemShow, setFormItemShow] = useState(false);
  const [formLocateShow, setFormLocateShow] = useState(false);
  const [alertDeleteDoc, setAlertDeleteDoc] = useState(false);
  const [jobToUpdate,setJobToUpdate]=useState(undefined);
  const [folioToUpdate,setFolioToUpdate]=useState(undefined);
  const [itemToUpdate,setItemToUpdate]=useState(undefined);
  const [locationToUpdate,setLocationToUpdate]=useState(undefined);


  const showFormItem = (folioId) => {setFormItemShow(folioId)}
  const hideFormItem = () => {setFormItemShow(false)}

  const totalFoliosManifest = jobFolios.reduce((accumulator, currentFolio)=>{
    return accumulator + currentFolio.folioManifest
  },0)
  
  // function totalFolioOutturn(folio) {
  //   return folio?.folioItems?.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.itemOutturn;
  //   }, 0);
  // }

  const currentOutturn = () => {
    return jobFolios.reduce((acc, cur) => {
      if (cur.folioItems) {
        return acc + cur.folioItems.reduce((subAcc, subCur) => subAcc + (subCur.itemOutturn || 0), 0);
      }
      return acc;
    }, 0);
  };

  
  
  return (
    <JobProgressContext.Provider
      value={{
        job, setJob,
        jobFolios, setJobFolios,
        folioItems, setFolioItems,
        formFolioShow, setFormFolioShow,
        formLocateShow, setFormLocateShow,
        formItemShow, setFormItemShow, showFormItem, hideFormItem,
        formDamageShow, setFormDamageShow, 
        totalFoliosManifest, 
        //totalFolioOutturn,
        currentOutturn,
        alertDeleteDoc, setAlertDeleteDoc,
        folioToUpdate, setFolioToUpdate,
        jobToUpdate,setJobToUpdate,
        itemToUpdate,setItemToUpdate,
        locationToUpdate,setLocationToUpdate
      }}
    >
      {children}
    </JobProgressContext.Provider>
  );
};
