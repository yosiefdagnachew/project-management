import React, { useState, useEffect } from "react";
import axios from "axios";
import SystemUsers from "../components/admin/systemUsers";
import { NavLink, useParams } from "react-router-dom";
import FeedBack from "../components/admin/feedBack";
import '../styles/admin/adminPanel.css';
import {
  AiOutlineLogout,
} from "react-icons/ai";
import {
  useNavigate
} from "react-router-dom";


export default function AdminPanel() {
  const [activeUser, setActiveUser] = useState({});
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    getUser();
  }, [id]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };

    getUsers();
  }, [id]);

  if (activeUser.position === 'System Administrator'){
      return (
        <> 
        <div className="admin-header">
           <div>
              <p>Debre Markos</p>
           </div>

           <div className="admin-profile">
              <div id="profile">
                <img src={activeUser.profile}/>
              </div>
              <div>
                <p>{activeUser.name}</p>
                <p>{activeUser.position}</p>
              </div>
              <div onClick ={()=>navigate('/login')} className="logout">
                < AiOutlineLogout/>
              </div>
           </div>
        </div>
        <div className="contaienr">
          <SystemUsers users={users}/>
          <FeedBack/>
        </div>
        </>
      );
  }else{
    return(
        <div className="admin-container">
            <h1>404 page not found</h1>
            <div>
            <NavLink to={`/user/${id}`}>Back to Home</NavLink>
            </div>
        </div>
    )
  }
}
