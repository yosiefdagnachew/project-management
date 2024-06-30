import React, { useState } from "react";
import axios from "axios";
import "../../styles/announce/announceForm.css";
import { GiCancel } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { useParams } from "react-router-dom";

export default function AnnouncementForm({ setCreateNewAnnouncement }) {
  // State variables to store the form data
  const [image, setImage] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const {id} = useParams();

  // Convert image file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const picture = await toBase64(image);
      const createAnnouncement = await axios.post(
        `http://localhost:5000/user/${id}/createAnnouncements`,
        {
          picture,
          header,
          description,
          mandatory,
          date,
          time,
          location,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
    // Reset the form after submission
    setImage("");
    setHeader("");
    setDescription("");
    setMandatory(false);
    setDate("");
    setTime("");
    setLocation("");
    setCreateNewAnnouncement(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div
          className="cancel-btn"
          onClick={() => setCreateNewAnnouncement(false)}
        >
          <GiCancel />
        </div>
        <div>
          <input
            placeholder="Announcement header"
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Announcement description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="event location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="ismandatory">
          <div>
            <label for="profile">
              <span>Select Image</span>
              <RxAvatar />
              <input
                type="file"
                id="profile"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
          <div>
            <span>Mandatory</span>
            <input
              type="checkbox"
              checked={mandatory}
              onChange={(e) => setMandatory(e.target.checked)}
            />
          </div>
        </div>
        <button type="submit">Create Announcement</button>
      </form>
    </div>
  );
}
