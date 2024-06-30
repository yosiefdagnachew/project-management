import React, { useState,useEffect } from "react";
import Announces from "../components/announce/announces";
import "../styles/announce/announce.css";
import { changeDate } from "../functions";
import AnnouncementForm from "../components/announce/anounce-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


export default function AnnouncmentPage() {
  const [createNewAnnouncement, setCreateNewAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const {id} = useParams();



  useEffect(() => {
    const getUser = async () => {
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
    const getAnnounces = async () => {
      try {
        const responce = await axios.get(
          `http://localhost:5000/user/${id}/getAnnouncements`
        );
      setAnnouncements(responce.data.announcement);
      } catch (error) {
        console.error(error)
      }
    };
    getAnnounces();
  }, [createNewAnnouncement]);

  return (
    <div className="announcementPage">
      {createNewAnnouncement && (
        <AnnouncementForm setCreateNewAnnouncement={setCreateNewAnnouncement} />
      )}
      <div className = "create-btn announce-header">
        {activeUser.position === 'Project Executive' && <div className="newAnnounce" onClick={() => setCreateNewAnnouncement(true)}>
          < AiOutlinePlus />
        </div>}
        <h4>{changeDate(Date.now())}</h4>
      </div>
      <Announces announcements={announcements} />
    </div>
  );
}
