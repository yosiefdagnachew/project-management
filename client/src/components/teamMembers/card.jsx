import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineUserDelete } from "react-icons/ai";
import MiniProgress from "../progress/miniProgress";
import EmployeeProfile from "../../pages/employeeProfile";
import { useParams } from "react-router-dom";
import axios from "axios";


const Card = ({ project, removeUser }) => {
  const [employeeInfo, setEmployeeInfo] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState({});
  const [activeUser, setActiveUser] = useState({});
  const { id } = useParams();


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    getUser();
  }, [id]);


   const getTotalTasks = (projects) => {
     const tasks = projects.map(project => (
       project.tasks.length
     ))
     return tasks.reduce((sum, task) => sum + task, 0);
   }


    const getCompletedTasks = (projects) => {
      let completedTasks = 0;
      projects.map(project => {
        (project.tasks).map(task => {
            if (task.status === 'Completed') {
                completedTasks++;
            }
        })
      });
      return completedTasks;
  }

  return (
    project &&
    project.team.map((user) => (
      <>
        {employeeInfo && <EmployeeProfile user={employeeProfile} />}
        <div
          className="member"
          style={{
            border:
              project.projectManager && project.projectManager._id === user._id
                ? "2px solid #c2baba"
                : "0px solid",
          }}
        >
          <div className="header">
            <AiFillCheckCircle />
            {activeUser.position === 'Project Manager' && <AiOutlineUserDelete onClick={() => removeUser(user._id)} />}
          </div>

          <div className="profileinfo">
            <div className="image">
              <img src={user.profile} alt="" />
            </div>
            <div className="userinfo">
              <h3>{user.name}</h3>
              <p>{user.position}</p>
            </div>
          </div>

          <div className="pro-footer">
            <div className="tasksprogress">
              <p className="tasks">{user.projects && getTotalTasks(user.projects)} Tasks</p>
              <div className="progressIndicator">
                <MiniProgress animates={2000} total={user.projects && getTotalTasks(user.projects)} progress={user.projects && getCompletedTasks(user.projects)} />
              </div>
            </div>

            <button
              onClick={() => {
                setEmployeeInfo(true);
                setEmployeeProfile(user);
              }}
              className="viewprofile"
            >
              View profile
            </button>
          </div>
        </div>
      </>
    ))
  );
};
export default Card;
