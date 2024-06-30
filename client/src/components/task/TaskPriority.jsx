import React from 'react'
import {AiOutlineEdit } from "react-icons/ai";


export default function TaskPriority({
  setPriority,
  setEditPriority,
  setEditProgress,
  handleUpdate,
  closeTask,
  selectedTask,
  editPriority,
}) {
  return (
    <div>
      {!editPriority ? (
        <p>
          Priority: <span>{selectedTask.priority}</span>{" "}
          <AiOutlineEdit
            className="edit-icon"
            onClick={() => {
              setEditPriority(true);
            }}
          />
        </p>
      ) : (
        <div className="priority-options">
          <p
            onClick={() => {
              setPriority("Low");
              setEditPriority(false);
              setEditProgress(false);
              handleUpdate("priority", "Low");
              closeTask();
            }}
            className={
              "Low" === selectedTask.priority ? "selectedPriorty" : "priority"
            }
          >
            Low
          </p>
          <p
            onClick={() => {
              setPriority("Medium");
              setEditPriority(false);
              setEditProgress(false);
              handleUpdate("priority", "Medium");
              closeTask();
            }}
            className={
              "Medium" === selectedTask.priority
                ? "selectedPriorty"
                : "priority"
            }
          >
            Medium
          </p>
          <p
            onClick={() => {
              setPriority("High");
              setEditPriority(false);
              setEditProgress(false);
              handleUpdate("priority", "High");
              closeTask();
            }}
            className={
              "High" === selectedTask.priority ? "selectedPriorty" : "priority"
            }
          >
            High
          </p>
        </div>
      )}
    </div>
  );
}