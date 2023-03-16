import {collection, doc, getDoc, getDocs, getFirestore, query, where}  from 'firebase/firestore'

export const db = getFirestore()

//CREATE

    export const useAddDoc = (collectionName, document)=>{
        const collectionSelected= collection(db, collectionName)
        addDoc(collectionSelected, document)
    }

    export const useAddDocJob = (job)=>{
        useAddDoc('jobs', job)
    }
    export const useAddDocFolio = (folio)=>{
        useAddDoc('folios', folio)
    }
//READ

    export const useGetDoc =(collectionName, id) => {
        const queryDoc =  doc (db, collectionName, id)
        getDoc(queryDoc)
    }


    export const useGetDocs = (collectionName)=>{
        const queryCollection = collection(db, collectionName)
        return(
            getDocs(queryCollection)
        )
    }

    export const getJobs = () =>{
        return(
            useGetDocs('jobs')
        ) 
    }


    export const useGetFilteredDocs = (collectionName, field, matchType, value)=>{
        const queryCollection = (db, collectionName)
        const queryFiltered = query(
                queryCollection,
                where(field , matchType , value ))
        getDocs(queryFiltered)
    }

