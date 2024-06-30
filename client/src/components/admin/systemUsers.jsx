import React, { useState, useEffect } from "react";
import "../../styles/admin/systemuser.css";
import EmployeeProfile from "../../pages/employeeProfile";

export default function SystemUsers({ users }) {
  const [userInfo, setUserInfo] = useState({});
  const [openProfile, setOpenProfle] = useState(false);

  const profile = (user) => {
    setUserInfo(user);
    setOpenProfle(true);
  };

  if (openProfile && userInfo) {
    return <EmployeeProfile user={userInfo} />;
  } else {
    return (
      <div className="systemContainer">
        <h1>System Users</h1>
      <div className="systemUserContainer">
        {users &&
          users.map((user) => (
            <div className="user" onClick={() => profile(user)}>
              <div className="userInfos">
                <div className="profilePic">
                  <img src={user.profile} alt="" />
                </div>

                <div className="infos">
                  <h4>{user.name}</h4>
                  <p>{user.position}</p>
                </div>
              </div>
              <div className = {
                user.account === 'active' ? "accountStatus accountStatus-active" : "accountStatus accountStatus-not-active"
              } >
                <p>{user.account}</p>
              </div>
            
            </div>
          ))}
      </div>
      </div>
    );
  }
}
