import React, { useState } from "react";
import axios from "axios";
import "../../styles/admin/feedbackForm.css";
import { useParams } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

function FeedBackForm({ setSendFeedBack }) {
  const [summery, setSummery] = useState("");
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedback = await axios.post(
        `http://localhost:5000/user/${id}/sendFeedBack`,
        { summery }
      );
      console.log(feedback);
    } catch (error) {
      console.error(error);
    }
    setSendFeedBack(false);
  };
  return (
    <section id="form-container">
      <form onSubmit={handleSubmit}>
      <div className = "cancle-btn"
      onClick = {
        () => setSendFeedBack(false)} >
        <GiCancel/>
      </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Please describe the problem as wide as possible"
          onChange={(e) => setSummery(e.target.value)}
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </section>
  );
}

export default FeedBackForm;
