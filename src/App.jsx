//Import REACT
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";

//Import COMPONENTS
import BaseUI from "./UI/scenes/BaseUI/BaseUI";
import FolioListUI from "./UI/scenes/FolioListUI/FolioListUI";
import JobDetailUI from "./UI/scenes/JobDetailUI/JobDetailUI";
import JobFormUI from "./UI/scenes/JobFormUI/JobFormUI";
import JobListUI from "./UI/scenes/JobListUI/JobListUI";
import JobProgressUI from "./UI/scenes/JobProgressUI/JobProgressUI";

import NavHeader from "./components/NavHeader/NavHeader";

//Import STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { JobProgressContextProvider } from "./context/Context";

function App() {
  return (
    <JobProgressContextProvider>
      <HashRouter>
        <div className="appContent">
          <NavHeader />
          <div className="">
            <Routes className="bg-colorJob">
              <Route path="/" element={<BaseUI />} />
              <Route path="/folioList" element={<FolioListUI />} />
              <Route path="/jobList" element={<JobListUI />} />
              <Route path="/jobDetail/:jobNumber" element={<JobDetailUI />} />
              <Route path="/jobForm" element={<JobFormUI />} />
              <Route path="/jobProgress/:jobNumber" element={<JobProgressUI />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </JobProgressContextProvider>
  );
}

export default App;
