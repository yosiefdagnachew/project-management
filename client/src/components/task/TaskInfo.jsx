import React, { useState, useEffect } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";
import { howMuchDaysLeft, changeDate } from "../../functions.js";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../ShowError/error";
import TaskPriority from "./TaskPriority.jsx";
import TaskAssign from "./taskAssign.jsx";
import TaskProgressEdit from "./TaskProgressEdit.jsx";

export default function TaskInfo({
  selectedTask,
  setIsupdated,
  setSelectedTask,
  setIsExpanded,
  tasks,
}) {
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPriority, setEditPriority] = useState(false);
  const [editProgress, setEditProgress] = useState(false);
  const [editAssinedTo, setEditAssinedTo] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const { id, projectId } = useParams();

  const [title, setUpdatedTitle] = useState("");
  const [description, setUpdatedDescription] = useState("");
  const [dueDate, setDueDate] = useState();

  let currentPriority = selectedTask && selectedTask.priority;
  let currentProgress = selectedTask && selectedTask.progress;

  const [priority, setPriority] = useState(currentPriority);
  const [progress, setProgress] = useState(currentProgress);

  const closeTask = () => {
    setSelectedTask(null);
    setIsExpanded(false);
  };

  useEffect(() => {}, [tasks, priority]);

  const handleUpdate = async (key, value) => {
    const taskid = selectedTask._id;
    try {
      if (value == "") {
        <Error />;
        return;
      }
      const update = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/tasks/${taskid}`,
        { [key]: value }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="taskinformation">
      {!selectedTask && <Loading />}
      {selectedTask && (
        <>
          <div className="info-header">
            <div className="due-date">
            {
              editDueDate? < div className = "update-task-duedate" >
                < input type = "date"
                onChange = {
                  (e) => setDueDate(e.target.value)
                }
                />
                <input onClick = {
                  () => {
                    setEditDueDate(false);
                    handleUpdate("dueDate", dueDate);
                  }
                }
                type = "submit"
                value = "edit"/>
              </div>:
              <div>
                <div className="date-info">
              <p>Due - {changeDate(selectedTask.dueDate)}</p>
              <span>{howMuchDaysLeft(selectedTask.startDate, selectedTask.dueDate)}</span>
                </div>
              <div onClick={() => setEditDueDate(true)}> <AiOutlineEdit/> </div>
              </div>}
            </div>
            <div className="close-icon" onClick={closeTask}>
              <AiOutlineClose />
            </div>
          </div>
          <div className="EditEntities">
            <div className="titledec">
              {!editTitle ? (
                <div>
                  <h2>{selectedTask.title}</h2>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => {
                      setEditTitle(true);
                      setEditDescription(false);
                      setIsupdated(true);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="edit task title"
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    value={title}
                  />
                  <MdOutlineDoneOutline
                    className="edit-icon done"
                    onClick={() => {
                      handleUpdate("title", title);
                      setEditTitle(false);
                      setIsupdated(false);
                      closeTask();
                    }}
                  />
                </div>
              )}
              {!editDescription ? (
                <div className="description">
                  <p>{selectedTask.description}</p>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => {
                      setEditDescription(true);
                      setEditTitle(false);
                      setIsupdated(true);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <textarea
                    placeholder="Edit Task description.."
                    value={description}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    cols="40"
                    rows="1"
                  ></textarea>
                  <MdOutlineDoneOutline
                    className="edit-icon done"
                    onClick={() => {
                      setEditDescription(false);
                      handleUpdate("description", description);
                      setIsupdated(false);
                      closeTask();
                    }}
                  />
                </div>
              )}
            </div>
            <div className="more-information">
              <TaskPriority
                setPriority={setPriority}
                setEditPriority={setEditPriority}
                setEditProgress={setEditProgress}
                handleUpdate={handleUpdate}
                closeTask={closeTask}
                selectedTask={selectedTask}
                editPriority={editPriority}
              />
              <TaskProgressEdit
                setProgress={setProgress}
                handleUpdate={handleUpdate}
                setEditProgress={setEditProgress}
                setEditPriority={setEditPriority}
                closeTask={closeTask}
                editProgress={editProgress}
                selectedTask={selectedTask}
              />

              <TaskAssign
                editAssinedTo={editAssinedTo}
                selectedTask={selectedTask}
                handleUpdate={handleUpdate}
                setEditAssinedTo={setEditAssinedTo}
                closeTask={closeTask}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
