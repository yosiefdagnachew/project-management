import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../styles/projects/completedProjects.css';
import { changeDate } from '../../functions';
import {
    NavLink
} from "react-router-dom";



function CompletedProjects({
    opencompletedProjectsPage
}) {
     const {id} = useParams();
     const [projects, setProjects] = useState([]);


    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/user/${id}/projects`
                );
                    setProjects(
                        response.data.projects.filter((project) =>
                           project.completionAcceptance === true
                        )
                    );
            } catch (error) {
               console.error(error)
            }
        };
            getProjects();
    }, [id, opencompletedProjectsPage]);
  return (
        <div className='completedProjects-container'>
            {projects && projects.map(project =>(
                < NavLink to={`/user/${id}/projects/${project._id}`}>
                    <div className = 'completedProjects'>
                        <div className='profile'>
                            <img src={project.projectManager.profile} alt=""/>
                        </div>
                        <div className='project'>
                            <h3>{project.title}( <p>{project.subTitle}</p>)</h3>
                        </div>
                        <div className='more-info'>
                            <div>
                                <p>{project.progress}%</p>
                                <p>{project.status}</p>
                            </div>
                            <div>
                                <p>{project.priority}</p>
                                <p>{changeDate(project.dueDate)}</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}
export default CompletedProjects;