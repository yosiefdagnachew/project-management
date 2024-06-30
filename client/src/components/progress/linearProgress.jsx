import "../../styles/linearProgress.css";

const LinearProgress = ({ project }) => {
  return (
    <div className="progress">
      <p>Progress</p>
      <div className="upperProgressBar">
        <div
          className="innerProgressBar"
          style={{
            width: `${project.progress}%`,
            backgroundColor: project.priority === "High" ? "yellow" : "#67b2f8",
          }}
        ></div>
      </div>
      <p className="percent">{project.progress}%</p>
    </div>
  );
};
export default LinearProgress;