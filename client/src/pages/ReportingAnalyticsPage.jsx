import React from "react";
import "../styles/report.css";
import { changeDate } from "../functions";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function ReportingPage({ report, setShowDetail }) {


  const {id} = useParams()
  const project_id = report.project._id;
  const report_id = report._id
  const manager_id = report.projectManager._id


  // report approval function
  const reportApprove = async () => {
    try {
      const acceptProject = await axios.post(`http://localhost:5000/user/${id}/projects/acceptProject`, {
        project_id,
        report_id,
        manager_id
      });
      console.log(acceptProject);
      setShowDetail(false);
    } catch (error) {
      console.log(error);
    }
  }



  // report cancle function
    const reportCanclation = async () => {
      try {
        const cancleProject = await axios.post(`http://localhost:5000/user/${id}/projects/cancleProject`, {
          report_id,
        });
        console.log(cancleProject);
        setShowDetail(false);
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <div className="back-drop">
      <div className="conatiner">
      <div className="close-page" onClick={() => setShowDetail(false)}>
        <AiOutlineClose />
      </div>
      <div className="reportPage">
        <div id="header">
          <h1>Project Completion Report</h1>
        </div>
        <div className="pro-information">
          < h1 className = "h1" > project information </h1>
          <div className="title-info">
            <div>
              <h1>{report.project.title}</h1>
              <h2>{report.project.subTitle}</h2>
            </div>
          
            <p>
              {
                report.summary
              }
            </p>
            <p>
              <span>Project Manager: {report.projectManager.name}</span>
            </p>
          </div>
        </div>

        <div className="pro-detail-info">
          <div className="timeline">
            <h1 className="h1">Project Timeline</h1>
            <p>
              <span>Project Start Date: </span>
              {changeDate(report.project.startDate)}
            </p>
            <p>
              <span>Project Due Date: </span>
              {changeDate(report.project.dueDate)}
            </p>
            <p>
              <span>Actual Completion Date: </span>
              {changeDate(report.project.dueDate)}
            </p>
          </div>

          <div className="payement-info-detail">
            <h1 className="h1">Cost Detail Information</h1>
            <div className="payment-info">
            {
              report.project.costList && report.project.costList.map(cost => (
                <div className="cost-info">
                  <p>-{cost.reason}</p>
                  <p>{cost.amount} Birr</p>
                  <p>{changeDate(cost.date)}</p>
                </div>
              ))
            }
            <div className="Total-analysis">
              <h4>Project Total Budget: {report.project.budget} Birr</h4>
              <h4>Project Internal cost: {report.project.budgetLeft} Birr</h4>
            </div>
            </div>
          </div>
          <div className="overall-info">
            <h1 className="h1">Task and budget information</h1>
            <div className="info-list">
              <div className="totaltaks">
                <h1>{report.project.tasks.length}</h1>
                <p>Total tasks created</p>
              </div>
              <div className="totalteam">
                <h1>{report.project.team.length}</h1>
                <p>team participated</p>
              </div>
              <div className="totalbudget">
                <h1>{report.project.budget}</h1>
                <p>Total Budget</p>
              </div>
              <div className="budgetleft">
                <h1>100</h1>
                <p>Budget Left</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-buttons">
          <button id="approve-btn" onClick={() => reportApprove()}>Approved</button>
          <button id="roll-back-btn" onClick={() => reportCanclation()}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
  );
}