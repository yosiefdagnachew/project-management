import React from "react";
import "../../styles/chat/teammember.css";

export default function TeamMembers({
  project,
  setInfo
}) {
  return (
    <div className="teammembersSec">
      <div className="team-header">
        <p>Teams Members</p>
        <p>{project.team.length}</p>
      </div>
      {project.team.map((member) => (
        <div id = "member"
        onClick = {
          () => setInfo(member)
        }>
          <div className="profileSec">
            <img src={member.profile} alt="" />
          </div>
          <div className="member-info">
            <h4>{member.name}</h4>
            <p>{member.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
