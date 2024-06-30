import React, { useEffect,useState } from 'react'
import Progress from '../progress/progress'

export default function Overview({project}) {


  const [planningTasks, setPlanningtasks] = useState([]);
  const [inprogressTasks, setInprogresstasks] = useState([]);
  const [completedTasks, setCompletedtasks] = useState([]);

  useEffect(()=>{
    const getTasksStatus = ()=>{
      const completed = project.tasks.filter((task) => task.status == "Completed")
      const planning = project.tasks.filter((task) => task.status == "Planning")
      const inprogress = project.tasks.filter((task) => task.status == "Inprogress")
      setPlanningtasks(planning);
      setInprogresstasks(inprogress);
      setCompletedtasks(completed);
    }
    getTasksStatus();
  },[])


  return (
    <>
      <div className="project-progress">
        <div className="tasks">
          <h1>{project.tasks.length}</h1>
          <p>Total tasks</p>
        </div>
        <div className="started">
          <h1>
            {planningTasks.length}
          </h1>
          <p>Planning</p>
        </div>
        <div className="inprogress">
          <h1>
            {
             
                inprogressTasks.length
            }
          </h1>
          <p>In progress</p>
        </div>
        <div className="completed">
          <h1>
            {completedTasks.length}
          </h1>
          <p>Completed</p>
        </div>

        <div className="overallProgress">
          <Progress animates={1000} total={100} progress={project.progress} />
          <p>overall progress</p>
        </div>
      </div>
      <div className="project-budget">
        <div className="total-budget">
          <p>Total Budget</p>
          <h1>{project.budget} BIrr</h1>
        </div>
        <div className="internal-cost">
          <div>
            <p>Internal cost</p>
            <h1>{project.budget - project.budgetLeft} Birr</h1>
          </div>
          <div className="circle-progress">
            <Progress
              animates={1000}
              total={project.budget}
              progress={project.budget - project.budgetLeft}
            />
          </div>
        </div>
        <div className="Budget-Left">
          <div>
            <p>Budget Left</p>
            <h1>{project.budgetLeft} Birr</h1>
          </div>
          <div>
            <Progress
              animates={1000}
              total={project.budget}
              progress={project.budgetLeft}
            />
          </div>
        </div>
      </div>
    </>
  );
}
