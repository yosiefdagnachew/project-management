import React,{useState} from "react";
import "../../styles/task/alltasks.css";
import {MdTask} from 'react-icons/md';
import { GiProgression } from "react-icons/gi";
import {

  FcMediumPriority,
  FcLowPriority,
  FcHighPriority,

} from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineProject, AiFillInfoCircle } from "react-icons/ai";


export default function Alltasks({ activeUser, projects }) {

  const [id, setId] = useState(null);

  return (
    <div className="task-container" id="task-container">
      <div className="projects">
        {projects.map((project) => (
          <div className="projects-container">
            <h3><h4><AiOutlineProject/>{project.title}</h4><span><span>{project.tasks.length}</span> Total Tasks</span></h3>
            {project.tasks.map((task) => {
              if (task.assignedTo === activeUser._id) {
                return (
                  <div className="tasks-list" onClick={()=>setId(task._id)} key={task._id}>
                    <div className = {
                      id === task._id?"active_task":''
                    } >
                      <p><span><MdTask/></span> {task.title}</p>
                      <p><span>{task.priority === 'High'?<FcHighPriority/>:task.priority === 'Low'?<FcLowPriority/>:<FcMediumPriority/>}</span> {task.priority}</p>
                      <p><span><GiProgression/></span> {task.progress}</p>
                      <p><span>{task.status === 'Completed'?<IoMdDoneAll/>:task.status === 'Planning'?<FcPlanner/>:<GiProgression/>}</span> {task.status}</p>
                    </div>
                    {id === task._id && <div className='taskInformation'>
                      <p>{task.description}</p>
                    </div>}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}