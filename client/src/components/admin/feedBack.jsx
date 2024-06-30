import React, { useEffect, useState } from "react";
import "../../styles/admin/feedback.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FeedBack() {
  const [feedBack, setFeedBack] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getFeedBacks();
  }, []);

  const getFeedBacks = async () => {
    try {
      const feedBacks = await axios.get(`http://localhost:5000/user/${id}/getFeedBacks`);
      setFeedBack(feedBacks.data.feedBack);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="user-feedbacks-section">
      <h1>user feedbacks</h1>
      <div className = "feedback-container" > {
          feedBack && feedBack.map(feed => (
        <div className="profile-info">
            <div id = "pro-image">
               <img src={feed.sender.profile}/>
            </div>
            <div className="pro-info">
              <p>{feed.summery}</p>
              <p>{feed.sender.name}</p>
            </div>
        </div>
      ))}</div>
    </div>
  );
}