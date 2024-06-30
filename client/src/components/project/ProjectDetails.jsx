import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/projectDetail.css";
import TaskList from "../task/TaskList";
import CreateTask from "../task/TaskForm";
import TeamMembers from "../teamMembers/TeamMembers";
import Loading from "../Loading/Loading";
import Overview from "../projectDetails/Overview";
import DiscussionBoard from "../collaboration/DiscussionBoard";
import ProjectDetailHeader from "./projectDetailHeader";
const ProjectDetailPage = () => {
  
  const { id, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [overviewPage, setOverviewPage] = useState(true);
  const [taskPage, setTaskPage] = useState(false);
  const [membersPage, setMembersPage] = useState(false);
  const [collaburationPage, setCollaburationPage] = useState(false);
  const [createTask, setCreateTask] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${id}/projects/${projectId}`
        );
        setProject(response.data.project); // Assuming the response data contains a 'project' property
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, [project]); // Include 'projectId' as a dependency

  if (!project) {
    return <Loading />;
  }

  return (
    <section className="projectDetailSection">
      {createTask && (
        <CreateTask project={project} setCreateTask={setCreateTask} />
      )}    
      <ProjectDetailHeader
        project={project}
        setOverviewPage={setOverviewPage}
        setTaskPage={setTaskPage}
        setCollaburationPage={setCollaburationPage}
        setMembersPage={setMembersPage}
      />
      {overviewPage && <Overview project={project} />}
      {taskPage && (
        <TaskList acti createTask={createTask} setCreateTask={setCreateTask} />
      )}
      {membersPage && <TeamMembers project={project} />}
      {collaburationPage && <DiscussionBoard project={project}/>}
    </section>
  );
};
export default ProjectDetailPage;