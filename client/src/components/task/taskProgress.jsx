import "../../styles/taskProgress.css";

const TaskProgress = ({ project }) => {
  return (
    <div id="progress1">
      <p>Progress</p>
      <div className="upperProgressBar">
        <div
          className="innerProgressBar"
          style={{
            width: `${project.progress}%`,
            backgroundColor: project.priority === "High" ? "#ff6b6b" :project.priority === 'Medium'?'#fdff8b':'#96d19e',
          }}
        ></div>
      </div>
      <p className="percent">{project.progress}%</p>
    </div>
  );
};
export default TaskProgress;