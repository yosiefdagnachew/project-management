import React, { useEffect } from "react";
import "../../styles/announce/announce.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsFillCalendarDayFill, BsFillPersonLinesFill } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { changeDate } from "../../functions";

export default function Announces({ announcements }) {
  return (
    <div className="announce-countainer">
      {announcements &&
        announcements.reverse().map((annuance) => (
          <div className="announce-card">
            <img src={annuance.image} />
            <div>
              <h4 className="announce-header">{annuance.header}</h4>
              <p className="announce-description">{annuance.description}</p>
            </div>
            <div className="footer-infos">
              <p>
                <CgOptions />
                {annuance.mandatory?"mandatory":"Optional"}
              </p>
              <p>
                <AiOutlineFieldTime />
                {annuance.time}
              </p>
              <p>
                <BsFillCalendarDayFill />
               {changeDate(annuance.date)}
              </p>
              <p>
                <BsFillPersonLinesFill />
               {annuance.location}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}