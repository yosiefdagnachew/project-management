import react, { useState, useEffect } from "react";
import "../../styles/task/taskfilter.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useParams } from "react-router-dom";

const TaskFilter = ({
  priority,
  setPriority,
  status,
  setStatus,
  setFilteredTask,
  tasks,
}) => {
  
  const handleTaskFilter = () => {
    if (priority && status) {
      setFilteredTask = tasks.filter(
        (task) => task.priority === priority && task.status === status
      );
    } else if (status) {
      setFilteredTask = tasks.filter((task) => task.status === status);
    } else if (priority) {
      setFilteredTask = tasks.filter((task) => task.priority === priority);
    }
  };

  return (
    <div className="filter-box" id="filter-box">
      <li>All</li>
      <li>
        <span>{priority ? priority : "Set priority"}</span>
        <div>
          <li onClick={() => setPriority("High")}>High</li>
          <li onClick={() => setPriority("Medium")}>Medium</li>
          <li onClick={() => setPriority("Low")}>Low</li>
        </div>
      </li>
      <li>
        <span>{status ? status : "Set status"}</span>
        <div>
          <li onClick={() => setStatus("Completed")}>Completed</li>
          <li onClick={() => setStatus("Inprogress")}>Inprogress</li>
          <li onClick={() => setStatus("Planning")}>Planning</li>
        </div>
      </li>
      <div className="search-icon" onClick={handleTaskFilter}>
        <AiOutlineSearch />
      </div>
    </div>
  );
};
export default TaskFilter;
