import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeDate, howMuchDaysLeft } from "../../functions.js";
import { AiOutlineCheck, AiOutlinePause, AiOutlineClose } from "react-icons/ai";
import Loading from "../Loading/Loading";
import LinearProgress from "../progress/linearProgress.jsx";
import '../../styles/projectlist.css'
export default function ProjectList({ projects, filterProjects }) {
  const { id } = useParams();

  if (!projects) {
    return <Loading />;
  } else {
    return (
      <div className="project-list">
        {projects &&
          (projects.reverse()).map((project) => (
            <NavLink id={id} to={`/user/${id}/projects/${project._id}`}>
              {(project.status === filterProjects || filterProjects === "") && (
                <div
                  className={
                    project.status === "On Hold"
                      ? "p-project pro1 onHold"
                      : project.status === "Cancelled"
                      ? "p-project pro1 cancelled"
                      : project.status === "Completed"
                      ? "p-project pro1 Completed"
                      : "p-project pro1"
                  }
                  style={{
                    backgroundColor:
                      project.priority === "Low"
                        ? "rgba(202, 241, 202, 0.7)" // Green with reduced opacity
                        : project.priority === "Medium"
                        ? "rgb(245, 240, 174)" // Orange with reduced opacity
                        : project.priority === "High"
                        ? "rgb(247, 161, 158)" // Red with reduced opacity
                        : "transparent",
                  }}
                >
                  <div className="pro-status-show">
                    <span>
                      {project.status === "On Hold" ? (
                        <p>
                          <AiOutlinePause className="icon" />
                          <p>On Hold</p>
                        </p>
                      ) : project.status === "Cancelled" ? (
                        <p>
                          <AiOutlineClose className="icon" />
                          <p>Cancelled</p>
                        </p>
                      ) : project.status === "Completed" ? (
                        <p>
                          <AiOutlineCheck className="icon" />
                          <p>Completed</p>
                        </p>
                      ) : project.status === "In Progress" ? (
                        <p>
                          <p>{project.progress}%</p>
                          <p>In progress</p>
                        </p>
                      ) : (
                        <p>
                          <p>{project.progress}%</p>
                          <p>Planning</p>
                        </p>
                      )}
                    </span>
                  </div>
                  <div className="pro-head">
                    <p>{changeDate(project.startDate)}</p>
                    <p>{project.priority}</p>
                  </div>
                  <div className="pro-title">
                    <h1>{project.title.slice(0, 20)}</h1>
                    <h2>{project.subTitle.slice(0, 20)}</h2>
                  </div>
                  <LinearProgress project={project} />
                  <div className="footer-detail">
                    < div className = {
                      project.priority === 'High' ? "boarder red" : project.priority === 'Low'?
                      "boarder green": "boarder yellow"
                    } > </div>
                    <div className="members">
                      {project.projectManager && (
                        <div className="m1">
                          <img src={project.projectManager.profile} alt="" />
                        </div>
                      )}
                      {project.team.length >= 2 && (
                        <div className="m2">
                          {<span>{project.team.length}+</span>}
                        </div>
                      )}
                      {/* <div className="add-icon">
                          <AiOutlinePlus />
                        </div> */}
                    </div>

                    <div
                      className="deadline"
                      style={{
                        backgroundColor: howMuchDaysLeft(Date.now(), project.dueDate).startsWith('passed') ? 'rgb(255,0,0)' :
                          project.priority === "High" ? "#c3f16d" : "#67b2f8",
                        color: howMuchDaysLeft(Date.now(), project.dueDate).startsWith('passed') ?'white':'#333'
                      }}
                    >
                      <p>
                        {howMuchDaysLeft(Date.now(), project.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
      </div>
    );
  }
}