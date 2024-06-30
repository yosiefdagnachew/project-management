import React, { useState } from "react";
import "../styles/employee.css";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeProfile({ user }) {
  const [accountStatus, setAccountStatus] = useState(user.account === "active");
  const [status, setStatus] = useState(user.account);
  const [showButtons, setShowButtons] = useState(false); // State to toggle button visibility
  const navigate = useNavigate();
  const id = user._id;

  const activate = async () => {
    try {
      await axios.post(`http://localhost:5000/user/${id}/activateAccount`);
      setStatus("active");
      setAccountStatus(true);
      setShowButtons(false); // Hide buttons after activating
    } catch (error) {
      console.log(error);
    }
  };

  const deactivate = async () => {
    try {
      await axios.post(`http://localhost:5000/user/${id}/deactivate`);
      setStatus("not active");
      setAccountStatus(false);
      setShowButtons(false); // Hide buttons after deactivating
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountLinkClick = () => {
    setShowButtons(true); // Show the buttons when the "Active" link is clicked
  };

  return (
    <div className="employee-info-page">
      <div onClick={() => window.history.back()} className="back-icon">
        <BiArrowBack />
      </div>
      {/* <div>
      <a href="javascript:void(0)" onClick={() => window.history.back()}>Back</a>
      </div> */}
      <div className="coverpic">
        <h1>DMU Employee Profile</h1>
        <p>{user.name}</p>
      </div>
      <div className="main-info">
        <div id="profile-info">
          <div className="pro-image">
            <img src={user.profile} alt="" />
          </div>

          <div className="information">
            <div>
              <h2>{user.name}</h2>
              <p>{user.position}</p>
            </div>

            <div className="account-status">
              <p>
                Account status:{" "}
                <NavLink onClick={handleAccountLinkClick}>{status}</NavLink>
              </p>

              {showButtons && (
                <div className="setAccountStatus">
                  <p onClick={activate}>Set active</p>
                  <p onClick={deactivate}>Deactivate</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="employee-status">
          <div className="projects">
            <h1>
              {user.projects.filter((project) => project.status === "Completed")
                .length}/{user.projects.length}
            </h1>
            <p>Projects participated in</p>
          </div>
          <div className="tasks">
            <h1>
              {user.tasks.filter((task) => task.status === "Completed").length}/{
                user.tasks.length
              }
            </h1>
            <p>Tasks assigned</p>
          </div>
          <div className="leads">
            <h1>{user.assignedProjects.length}</h1>
            <p>Projects lead</p>
          </div>
          <div className="more-info">
            <h1>
              {user.tasks.filter((task) => task.status === "Completed").length}/{
                user.tasks.length
              }
            </h1>
            <p>Tasks assigned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
