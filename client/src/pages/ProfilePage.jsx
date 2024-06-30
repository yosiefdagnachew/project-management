import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillEdit,
} from "react-icons/ai";
import Progress from "../components/progress/progress";
import Loading from "../components/Loading/Loading";

export default function ProfilePage() {
  const { id } = useParams();
  const [editInfos, setEditInfos] = useState(false);
  const [user, setUser] = useState({});

  // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(user.data.user);
    };
    getUser();
  }, [id]);
  

  const deactivate = async () => {
    try {
        const deactivateaccount = await axios.post(`http://localhost:5000/user/${id}/deactivate`);
    } catch (error) {
        console.log(error);
    }
  }


  const getCompletionRate = (user) => {
    const completedProjects = user.projects.filter(project => project.status === 'Completed');
    const totalProjects = user.projects.length;

    if (totalProjects  === 0){
      return 0
    }
    return Math.floor((completedProjects.length / totalProjects) * 100);
  }

  const getTaskStatus = (projects) => {

    let completedTasks = 0;
    let inProgressTasks = 0;
    let planningTasks = 0;

    projects.map(project => {
      (project.tasks).map(task => {
        if (task.status === 'Completed') {
          completedTasks++;
        } else if (task.status === 'Inprogress') {
          inProgressTasks++;
        } else if (task.status === 'Planning') {
          planningTasks++;
        }
      })
    })
    return [completedTasks, inProgressTasks, planningTasks]
  }


  const getTotalTasks = (projects) => {
    const tasks = projects.map(project => (
      project.tasks.length
    ))
    return tasks.reduce((sum, task) => sum + task, 0)
  }

  const changeDate = (date) => {
    const dt = new Date(date);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric"
    };
    const formattedDate = dt.toLocaleDateString("en-US", options);
    return formattedDate; // Output example: "May 25, 2023"
  };



  const getYearsOfExperience = (employmentDate) => {

    const start = new Date(); // Use current date/time as the start date
    const due = new Date(employmentDate);

    const timeDiff = start.getTime() - due.getTime();
    const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return Math.floor(diffInDays / 365);
  }


  if (!user){
    return <Loading/>
  }

  return (
    <section id="profile">
      <div className="profileinformation">
        <div className="profiliepic">
          <img src={user && user.profile} alt="" />
        </div>
        <div className="personal-info">
          <h3>Full Name: {user.name}</h3>
          <p>{user.position}</p>
          <p>Employee Since: {changeDate(user.employmentDate)}</p>
          <p>Salary: {user.salary} Birr</p>
          <p>Employee-Code: {user.code}</p>
          <p>Employee-sex: {user.sex}</p>
        </div>

        <div className="contact-me">
          <h2>Contact me</h2>
          <p>Email: {user.email}</p>
          <p>Phone-Number: {user.phoneNumber}</p>

          <div className="social">
            <AiFillFacebook />
            <AiFillInstagram />
            <AiOutlineTwitter />
            <AiFillLinkedin />
          </div>
        </div>
        <div className="edit-profile">
          <AiFillEdit onClick={() => setEditInfos(true)} />
          {editInfos && (
            <div className="edioption">
              <li onClick={()=>{deactivate();setEditInfos(false);}}>diactivate account</li>
            </div>
          )}
        </div>
      </div>
      <div className="employeementInfo">
        <div className="userrating">
          <div>
            <h1>
             {getYearsOfExperience(user.employmentDate)} < sup > + </sup> <span>years</span >
            </h1>
            <p>Experience at DMU University</p>
          </div>
          <div>
            <h1>
              {user.projects && user.projects.length}<sup>+</sup> <span>projects</span>
            </h1>
            <p>Participated in</p>
          </div>
          <div>
            <h1> {
              user.projects && getCompletionRate(user)
            } % </h1>
            <p>Project completion rate</p>
          </div>
        </div>

        <div className="tasksprogress">
          <div>
            <h1>{user.projects && getTotalTasks(user.projects)}</h1>
            <p>Total Tasks</p>
          </div>

          <div>
           
            <Progress animates={900}
                      total={user.projects && getTotalTasks(user.projects)}
                      progress={user.projects && getTaskStatus(user.projects)[0]} 
            />
            <p>Completed Tasks</p>
          </div>
          <div>
            <Progress animates={1100} 
                      total={user.projects && getTotalTasks(user.projects)} 
                      progress={user.projects && getTaskStatus(user.projects)[1]} 
            />
            <p>In Progress</p>
          </div>
          <div>
            <Progress animates={1300} 
                      total={user.projects && getTotalTasks(user.projects)} 
                      progress={user.projects && getTaskStatus(user.projects)[2]} 
            />
            <p>Not Yet Started</p>
          </div>
        </div>
      </div>
    </section>
  );
}
