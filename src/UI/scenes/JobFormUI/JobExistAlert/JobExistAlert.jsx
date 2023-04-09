import React from "react";
import { Link } from "react-router-dom";

const JobExistAlert = ({jobNumber}) => {
  return (
    <div className="m-3 d-flex flex-wrap justify-content-center alert alert-danger">
        <p className="fs-3">
            Job <strong className="fw-semiBold">{jobNumber}</strong> already exist
        </p>
        <Link to={`/jobProgress/${jobNumber}`} className="btn btn-outline-primary">SEE THIS JOB  </Link>
      
    </div>
  );
};

export default JobExistAlert;
