import React, {useState, useEffect} from 'react';
import TeamMembers from '../chat/teamMembers';
import Chatting from '../chat/chatting';
import "../../styles/chat/discussionBoard.css";

export default function DiscussionBoard({project}) {

  const [userInfo, setInfo] = useState(null);
  return (
    <div className='discussionBoard'>
      <TeamMembers project = {project} setInfo = {setInfo}/>
      <Chatting project={project} userInfo = {userInfo}/>
    </div>
  );
}