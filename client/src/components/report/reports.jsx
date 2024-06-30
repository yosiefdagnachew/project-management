import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/reportList.css";
import {changeDate} from '../../functions'
import ReportingPage from "../../pages/ReportingAnalyticsPage";
import {
  AiOutlineProject,
} from "react-icons/ai";
import {
  MdTask
} from 'react-icons/md';



const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [proDetail, setProDetail] = useState(null);
  const [showDetails, setShowDetail] = useState(false);
  const { id, projectId } = useParams();

  useEffect(() => {
    const handleReports = async () => {
      try {
        const reports = await axios.get(
          `http://localhost:5000/user/${id}/projects/reports`
        );
        setReports(reports.data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    handleReports();
  }, []);

  return (
    <div className="reportList">
      <div className="report-header">
      <h5>Project Reports</h5>
      <div>
        <span>{reports.length}</span>
        < AiOutlineProject/>
      </div>
      </div>
      {showDetails && (
        <ReportingPage report={proDetail} setShowDetail={setShowDetail} />
      )}
      {reports &&
        reports.map((report) => (
          <div
            className="report"
            onClick={() => {
              setProDetail(report);
              setShowDetail(true);
            }}
          >
            <div className="report-icon">
              <div>
                < MdTask/>
              </div>
            <h3><span>({report.project.subTitle})</span>{report.project.title.slice(0, 13) + ".."}</h3>
            </div>
            {/* <p className="date">{changeDate(report.reportSendat)}</p> */}
          </div>
        ))}
    </div>
  );
};

export default ReportList;
