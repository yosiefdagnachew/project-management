import React from 'react'
import {AiOutlineEdit } from "react-icons/ai";

export default function TaskProgressEdit({
  editProgress,
  closeTask,
  setEditPriority,
  setEditProgress,
  handleUpdate,
  setProgress,
  selectedTask,
}) {
  return (
    <div>
      {!editProgress ? (
        <p>
          Progress: <span>{selectedTask.progress}%</span>{" "}
          <AiOutlineEdit
            onClick={() => {
              setEditProgress(true);
            }}
            className="edit-icon"
          />
        </p>
      ) : (
        <div>
          <p
            className={
              0 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(0);
              handleUpdate("progress", 0);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            0%
          </p>
          <p
            className={
              10 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(10);
              handleUpdate("progress", 10);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            10%
          </p>
          <p
            className={
              20 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(20);
              handleUpdate("progress", 20);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            20%
          </p>
          <p
            className={
              30 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(30);
              handleUpdate("progress", 30);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            30%
          </p>
          <p
            className={
              40 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(40);
              handleUpdate("progress", 40);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            40%
          </p>
          <p
            className={
              50 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(50);
              handleUpdate("progress", 50);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            50%
          </p>
          <p
            className={
              60 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(60);
              handleUpdate("progress", 60);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            60%
          </p>
          <p
            className={
              70 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(70);
              handleUpdate("progress", 70);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            70%
          </p>
          <p
            className={
              80 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(80);
              handleUpdate("progress", 80);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            80%
          </p>
          <p
            className={
              90 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(90);
              handleUpdate("progress", 90);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            90%
          </p>
          <p
            className={
              100 === selectedTask.progress ? "selectedProgress" : "progress"
            }
            onClick={() => {
              setProgress(100);
              handleUpdate("progress", 100);
              setEditProgress(false);
              setEditPriority(false);
              closeTask();
            }}
          >
            100%
          </p>
        </div>
      )}
    </div>
  );
}