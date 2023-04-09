import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJobProgressContext } from "../../context/Context";
import { formatDate } from "../../helpers/utils/formatDate";

const DataDispleyer = ({ field, data, className }) => {
  return (
    <div
      className={`d-inline-flex justify-content-between align-items-center p-1 m-1 rounded bg-colorGrey1 ${className}`}
    >
      <p className=" colorANJ fw-light m-0 p-1">{field}</p>
      <b className="flex-grow-1 text-end bg-colorWhite rounded p-1">{data}</b>
    </div>
  );
};

const JobCard = ({ job }) => {
  const {setAlertDeleteDoc, setJobToUpdate} = useJobProgressContext()
  const navigate = useNavigate()
  return (
    <div id={job.id} className="card flex-grow-1 my-3 mx-2 p-0 shadow">
      <h4 className="card-header bg-colorJob d-flex flex-wrap p-2">
        <div className="col-5 d-flex flex-wrap align-items-center">
          <b className="col-8 fw-semiBold fs-1 ">{job.jobNumber}</b>
          <div
            className="col-12 fw-light fs-4"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {job.jobClient}
          </div>
        </div>
        <div className="col-2 fw-light fs-5 d-flex flex-column align-items-center justify-content-center">
          <img src="icons/iconUnpack.svg"/> {/* Este icono deberia amoldarse al tipo de trabajo*/}
          <div>unpack</div>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <div className="">
            <div className="fw-light fs-4">{formatDate(job.jobStart)}</div>
          </div>
          <div className="">
            <img src="icons/iconDone.svg" alt="jobDone" /> {/* Este icono deberia aparecer en los trabajos terminados*/}
          </div>
        </div>
        <div className="col-1">
          <div
            className="col-1 d-block link-dark text-decoration-none dropdown-toggle text-primary fs-1"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></div>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <div className="dropdown-item" onClick={()=>
                  {setJobToUpdate(job)
                    navigate('/JobForm/')
                  }
                } >
                Edit job details
              </div>
            </li>
            <li>
              {/* <div className="dropdown-item" href="#">
                See details
              </div> */}
              <Link
                to={`/jobProgress/${job.id}`}
                className="dropdown-item"
                href="#"
              >
                Work on it
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <div className="dropdown-item" href="#" onClick={()=>setAlertDeleteDoc( {collection:"jobs" , job })}>
                Delete job
              </div>
            </li>
          </ul>
        </div>
      </h4>

      <div className="card-body p-1 fs-5">
        <div className="d-flex flex-wrap align-items-center">
          <DataDispleyer field="CONTAINER" data={job.jobContainerNumber} />
          <div className="col-2 ms-2">{job.jobContainerISO}</div>
          <DataDispleyer field="SEAL" data={job.jobCuttedSeal} />
        </div>

        <hr className="m-1" />

        <div className="d-flex flex-wrap justify-content-between">
          <DataDispleyer
            field="MANIFEST"
            data={job.jobManifest}
            className="col-6"
          />
          <DataDispleyer
            field="FOLIOS"
            data={job.jobTotalFolios}
            className="col-5"
          />
          <DataDispleyer field="ITEMS" data="44" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
