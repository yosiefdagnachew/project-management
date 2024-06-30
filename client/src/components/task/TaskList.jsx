import React, { useState, useEffect, useCallback } from "react";
import { BsListTask } from "react-icons/bs";
import { AiOutlineCheckCircle, AiFillPlusCircle } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { FcPlanner } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import TaskInfo from "./TaskInfo.jsx";
import TaskProgress from "./taskProgress";
import "../../styles/task/taskList.css";

const TaskList = ({ createTask, setCreateTask }) => {
  const { id, projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isupdated, setIsupdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [currentProject, setCurrentProject] = useState({});

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      setActiveUser(response.data.user);
    } catch (error) {
      console.error("Error getting user:", error);
    }
  }, [id]);


  const fetchCurrentProject = useCallback(async () => {
    try {
       const response = await axios.get(
         `http://localhost:5000/user/${id}/projects/${projectId}`
       );
       setCurrentProject(response.data.project)
    } catch (error) {
      
    }
  })

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${id}/projects/${projectId}/getTasks`
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [id, projectId]);

  useEffect(() => {
    fetchCurrentUser();
    fetchTasks();
    fetchCurrentProject();
  }, [fetchCurrentUser, fetchTasks]);



  const findSingleTask = useCallback(
    (id) => {
      const task = tasks.find((item) => item._id === id);
      setSelectedTask(task);
      setIsExpanded(true);
    },
    [tasks]
  );

  

  return (
    <section>
      {loading && <Loading />}
     {
(       (activeUser && activeUser.position === 'Project Executive') || (currentProject.projectManager && currentProject.projectManager._id === activeUser._id) )&& < div className = "task-list-header" >
        <h1></h1>
        <div>
          {
          <button onClick={() => setCreateTask(true)}>
            <AiFillPlusCircle className="add" />
            Add new task
          </button>}
        </div>
      </div>}
      <div
        className={`task-container ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <div className="tasklist">
          {tasks.map((task) => (
            <NavLink
              key={task._id}
              onClick={() => findSingleTask(task._id)}
              className={
                selectedTask && task._id === selectedTask._id
                  ? "selectedTask"
                  : ""
              }
            >
              <div className="task t1">
                <div>
                  <BsListTask
                    className={
                      selectedTask && task._id === selectedTask._id
                        ? "taskSelected"
                        : ""
                    }
                  />
                  <p>{task.title.slice(0, 13)}</p>
                </div>
                <div>
                  <TaskProgress project={task} />
                  <p
                    className={
                      task.priority === "Low"
                        ? "priority green"
                        : task.priority === "Medium"
                        ? "priority orange"
                        : task.priority === "High"
                        ? "priority red"
                        : ""
                    }
                  >
                    {task.priority}
                  </p>
                  <div id="progress">
                    {task.status === "Inprogress" && <GiProgression />}
                    {task.status === "Completed" && <AiOutlineCheckCircle />}
                    {task.status === "Planning" && <FcPlanner />}
                  </div>
                  <p>{task.status}</p>
                  <div className="members-list" id="members">
                    <div>
                      <img
                        src={task.assignedTo ? task.assignedTo.profile : ""}
                        alt=""
                      />
                    </div>
                    <AiFillPlusCircle className="add" />
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        {(selectedTask &&
          selectedTask.assignedTo._id === activeUser._id || activeUser.position === 'Project Executive' || currentProject.projectManager && currentProject.projectManager._id === activeUser._id) && (
            <TaskInfo
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              setIsExpanded={setIsExpanded}
              setIsupdated={setIsupdated}
              tasks={tasks}
            />
          )}
      </div>
    </section>
  );
};
export default TaskList;