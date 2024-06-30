import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";
import "../../styles/notification.css";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { CiUnread } from "react-icons/ci";
import { BsArrow90DegRight } from "react-icons/bs";
import {changeDate,getCurrentDateFormat} from '../../functions.js'

const Notification = ({ id, setNotificationBar,notificationBar }) => {
  const [activeUser, setActiveUser] = useState({});
  const [activeNotify, setActiveNotify] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setActiveUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id, activeNotify]);

  const handleNotificationClick = async (notificationId) => {
    try {
   
      setActiveNotify(notificationId);
      setNotificationBar(true);
      const readNotification = await axios.post(`http://localhost:5000/user/${id}/setRead`, {
        notificationId
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationClickClose = () => {
    setActiveNotify(null);
    setNotificationBar(false);
  };

  return (
    <div className="mes-not">
      
      <div className="notifications">
        <div className="notifiy-header">
            <p>Notifications</p>
        <div>
          {
            activeUser.notifications && (activeUser.notifications.filter(notification => notification.isRead === false)).length > 0 && < span > {
              activeUser.notifications && (activeUser.notifications.filter(notification => notification.isRead === false)).length
            } </span>}
          < IoMdNotificationsOutline / >
        </div>
        </div>
         {activeNotify && 
                <div className = "close-notify"
                    onClick = {handleNotificationClickClose}>
                      <AiOutlineClose />
                  </div>}
        
        <div className = "notification-list"
        style = {
          {
            overflow: notificationBar ? "visible" : "auto",
          }
        } >
          <div    style = {
          {
            display: notificationBar ? "grid" : "none",
          }
        }  className="backdrop"></div>
          {activeUser.notifications &&
            activeUser.notifications
              ?.slice()
              .reverse()
              .map((notify) => (
                <div
                  key={notify._id}
                  className={`notify ${
                    notify._id === activeNotify ? "activeNotification" : ""
                  }`}
                  onClick={() => handleNotificationClick(notify._id)}
                >
                 
                  
                  <div className="message">
                    <div className="notification-header">
                      <div className="" style={{
                        backgroundColor: notify.isRead?"#eee":"red",
                        color: notify.isRead?"red":"#fff"
                      }}>
                        <IoMdNotificationsOutline />
                      </div>
                      <p className="no-header">{notify.type}</p>
                    </div>
                    <p className="no-body">
                      {notify._id === activeNotify
                        ? `${notify.message.slice(0)}`
                        : `${notify.message.slice(0, 0)}`}
                    </p>
                    <p className = {
                      notify._id === activeNotify ? "created-date date" : "created-date"
                    } >
                      {changeDate(notify.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
export default Notification;