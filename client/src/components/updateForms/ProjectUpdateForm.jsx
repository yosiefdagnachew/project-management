import React, { useState, useEffect } from "react";
import "../../styles/updateForms/projectUpdateForm.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../styles/member.css";
import { useParams } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";

export default function ProjectUpdateForm({ setUpdateProjct, project }) {
  const [openManager, setOpenManager] = useState(false);
  const [statusBox, setStatusBox] = useState(false);
  const [priorityBox, setPriorityBox] = useState(false);
  const [progressBox, setProgressBox] = useState(false);

  // form values

  const [projectManager, setManager] = useState(
    project.projectManager ? project.projectManager._id : ""
  );
  const [managerPlaceholder, setManagerPlaceholder] = useState(
    project.projectManager ? project.projectManager.name : "no assigned manager"
  );

  const [status, setStatus] = useState(project.status);
  const [costReason, setCostReason] = useState('');
  const [priority, setPriority] = useState(project.priority);
  const [progress, setProgress] = useState(project.progress);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [internalCost, setBudget] = useState(0);
  const [dueDate, setDueDate] = useState(project.dueDate);
  const [employees, setEmployees] = useState([]);

  const { id, projectId } = useParams();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        const users = response.data.user;

        // Filter users to only include those with position 'Project Manager'
        const projectManagers = users.filter(
          (user) => user.position === "Project Manager"
        );

        setEmployees(!project.projectManager?projectManagers:
          projectManagers.filter(
            (manager) => manager._id !== project.projectManager._id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [projectManager]);
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/updateProject`,
        {
          projectManager,
          status,
          dueDate,
          priority,
          progress,
          title,
          description,
          internalCost,
          costReason
        }
      );

      console.log(response)

      setUpdateProjct(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="editOptions">
      <div className="close-icns" onClick={() => setUpdateProjct(false)}>
        <AiOutlineClose />
      </div>
      <form onSubmit={handleUpdate}>
        <div className="basicInfo">
          <div>
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              placeholder={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dueDate">Project dueDate</label>
            <input
              type="Date"
              id="dueDate"
              value = {
                dueDate
              }
              onChange = {
                (e) => setDueDate(e.target.value)
              }
            />
          </div>
        </div>
          <div>
            <label htmlFor="budget">How Much money you take this week?</label>
            <input
              type="Number"
              id="budget"
              placeholder='10,000 Birr'
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          

        <div>
          <label htmlFor="description">internal Cost Reason</label>
          <textarea
            name="description"
            id=""
            cols="28"
            rows="1"
            placeholder='Cost reason...'
            onChange={(e) => setCostReason(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="description">Project Description</label>
          <textarea
            name="description"
            id=""
            cols="28"
            rows="1"
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="dropdowns">
          <div className="setProjectManager">
            <p
              onClick={() => {
                setOpenManager(true);
                setStatusBox(false);
                setPriorityBox(false);
                setProgressBox(false);
              }}
            >
              Set projectManager: <span>{managerPlaceholder}</span>
            </p>
            {openManager && (
              <div id="updateside">
                <div
                  className="close-icon"
                  onClick={() => setOpenManager(false)}
                >
                  <GrFormClose />
                </div>
                {employees &&
                  employees.map((user) => (
                    <div
                      key={user._id}
                      className="employee"
                      onClick={() => {
                        setManager(user._id);
                        setManagerPlaceholder(user.name);
                        setOpenManager(false);
                      }}
                    >
                      <div className="profilePic">
                        <img src={user.profile} alt="" />
                      </div>
                      <div>
                        <h5>{user.name}</h5>
                        <p>{user.position}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="projectStatus">
            <p
              onClick={() => {
                setOpenManager(false);
                setStatusBox(true);
                setPriorityBox(false);
                setProgressBox(false);
              }}
            >
              Update Status: <span>{status}</span>
            </p>
            {statusBox && (
              <ul>
                <li
                  onClick={() => {
                    setStatus("On Hold");
                    setStatusBox(false);
                  }}
                >
                  On Hold
                </li>
                <li
                  onClick={() => {
                    setStatus("Cancelled");
                    setStatusBox(false);
                  }}
                >
                  Cancelled
                </li>
              </ul>
            )}
          </div>
          <div className="projectPriority">
            <p
              onClick={() => {
                setOpenManager(false);
                setStatusBox(false);
                setPriorityBox(true);
                setProgressBox(false);
              }}
            >
              Update Priority: <span>{priority}</span>
            </p>
            {priorityBox && (
              <ul>
                <li
                  onClick={() => {
                    setPriority("Low");
                    setPriorityBox(false);
                  }}
                >
                  Low
                </li>
                <li
                  onClick={() => {
                    setPriority("Medium");
                    setPriorityBox(false);
                  }}
                >
                  Medium
                </li>
                <li
                  onClick={() => {
                    setPriority("High");
                    setPriorityBox(false);
                  }}
                >
                  High
                </li>
              </ul>
            )}
          </div>
        </div>
        <input type="submit" value="Update" style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
}
