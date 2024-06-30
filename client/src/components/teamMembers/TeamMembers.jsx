import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiOutlinePlus,
  AiOutlineUserDelete,
} from "react-icons/ai";
import "../../styles/member.css";
import axios from "axios";
import { GrFormClose } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Error from "../ShowError/error";
import Confirmation from "../warning/confirmation";
import Loading from "../Loading/Loading";
import Card from './card'
import {BiSearch} from "react-icons/bi";


export default function TeamMembers({ project }) {
  
  const [employees, setEmployees] = useState([]);
  const [openUsersBox, setOpenusersBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [searching, setSearching] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const { id, projectId } = useParams();


    const searchUsers = (e) => {
      setSearching(true);
      setSearchedUsers(
        employees.filter((user) => user.name.startsWith(e) || user.position.startsWith(e))
      );
    }


  // get active user
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`http://localhost:5000/user/${id}`);
      setActiveUser(user.data.user);
    };

    getUser();
  }, [id]);


  useEffect(() => {
    // setLoading(true);
    const getUsers = async () => {
      try {
        const users = await axios.get("http://localhost:5000/user");
        setEmployees(users.data.user);
        console.log(employees);
      } catch (error) {
        console.log(error);
      }
        setLoading(false);
    };
    getUsers();
  }, []);


  const addUser = async (userId) => {
    try {
      const add = await axios.post(
        `http://localhost:5000/user/${id}/projects/${projectId}/addEmployee`,
        { userId }
      );
      setOpenusersBox(false);
      // setEmployeeorRemovedAdded(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to add employee to the project");
      }
    }
  };


  const removeUser = async (userId) => {
    setOpenConfirmationBox(true);
    setUserId(userId);
  };


  useEffect(() => {
    const removeEmployee = async () => {
      try {
        await axios.post(
          `http://localhost:5000/user/${id}/projects/${projectId}/removeEmployee`,
          { userId }
        );
        setOpenusersBox(false);

        // Update the project state with the updated team members
        const updatedProject = { ...project };
        updatedProject.team = updatedProject.team.filter(
          (user) => user._id !== userId
        );
        project = updatedProject;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to remove employee from this project");
        }
      }
      setConfirmed(false);
    };

    if (confirmed) {
      removeEmployee();
    }
  }, [confirmed, openConfirmationBox]);

    if (!project) {
      return <Loading />;
    }

  return (
    <section className="teammembers">
      {errorMessage !== "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      {openConfirmationBox && (
        <Confirmation
          setConfirmed={(value) => {
            setConfirmed(value);
            setOpenConfirmationBox(false);
          }}
        />
      )}

      {(activeUser.position === "Project Manager" ||
        activeUser.position === "Project Executive") && (
        <div className="add-icon" onClick={() => setOpenusersBox(true)}>
          <AiOutlinePlus />
        </div>
      )}

      {openUsersBox && (
        <div id="all-empolloyee">
          <div className="close-icon" onClick={() => setOpenusersBox(false)}>
            <GrFormClose />
          </div>
          <div className="member-searchBar">
            < input type = "text"
            name = "search"
            placeholder = "search.."
            onChange = {
              (e) => searchUsers(e.target.value)
            }
            />
          </div>
          {
          (searchedUsers.length > 0 && searching ? searchedUsers : !searching ? employees : searchedUsers)
            .map((user) => (
              (user.position !== "Project Executive" && user.position !== "System Administrator" && user.position !== "Project Manager" &&
               <div className = "employee"
                onClick = {
                  () => addUser(user._id)
                } >
                <div className="personal-info">
                  <div className="profilePic">
                    <img src={user.profile} alt="" />
                  </div>
                  <div>
                    <h5>{user.name}</h5>
                    <p>{user.position}</p>
                  </div>
                </div>
              </div>)
            ))}
        </div>
      )}
      <div className="teammemberlist">
        {project.team && <Card removeUser={removeUser} project={project} />}
      </div>
    </section>
  );
}