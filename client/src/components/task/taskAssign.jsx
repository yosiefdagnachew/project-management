import react from 'react'
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";


const TaskAssign = ({
  editAssinedTo,
  selectedTask,
  handleUpdate,
  setEditAssinedTo,
  closeTask,
}) => (

  <div>
    {!editAssinedTo ? (
      <p className="assigned-to">
        Assigned To:{" "}
        {selectedTask.assignedTo
          ? selectedTask.assignedTo.name
          : "not assigned"}
        <span></span>
        <AiOutlineEdit
          className="edit-icon"
          onClick={() => {
            setEditAssinedTo(true);
          }}
        />
      </p>
    ) : (
      <div className="members-to-assign">
        {selectedTask.project &&
          selectedTask.project.team.map((mem) => (
            <span
              id="team-member"
              className={
                selectedTask.project.projectManager === mem._id
                  ? "team-member-manager"
                  : "team-member"
              }
              onClick={() => {
                handleUpdate("assignedTo", mem._id);
                setEditAssinedTo(false);
                closeTask();
              }}
            >
              <span className="personal-info">
                <span className="image-icon">
                  <img src={mem.profile} alt="" />
                </span>
                <div>
                  <p>{mem.name}</p>
                  <p>{mem.position}</p>
                </div>
              </span>
              <span>
                <BsCheckCircle />
              </span>
            </span>
          ))}
      </div>
    )}
  </div>
  )
export default TaskAssign;