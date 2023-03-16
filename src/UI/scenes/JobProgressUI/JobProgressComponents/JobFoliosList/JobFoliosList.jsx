import React from "react";
import FolioCard from "../../../../../components/FolioCard/FolioCard";
import { useJobProgressContext } from "../../../../../context/Context";

const JobFoliosList = () => {
  const{ jobFolios }= useJobProgressContext()
  
  return (
    <div className="">
      {jobFolios.map((folio) => (
        <FolioCard key={folio.id} folio={folio} />
      ))}
    </div>
  );
};

export default JobFoliosList;
