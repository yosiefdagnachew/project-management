import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import "../../styles/warning.css";
import "../../styles/global.css";
import {NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function WarningPage() {

  const [close, setClose] = useState(false)

  return (
    <div className={!close?"backdrop":"close-backdrop"}>
    <div className="warning-page">
      <h1>Access Warning</h1>
      <p>
        If you are not an employee of the university or have no legitimate
        affiliation with the university, please refrain from attempting to register
        or login. Our system verifies user information against our employee
        database, and unauthorized access is strictly prohibited. Unauthorized
        access attempts will be tracked, and repeated unsuccessful attempts will
        result in the blocking of your email address, preventing further access.
        Please consider these factors before attempting to gain unauthorized
        access.
      </p>
      <div className="button-container">
        <NavLink onClick={()=> setClose(true)}>
          Yes, I am an employee
        </NavLink>
        <NavLink to={'/'}>
          Go back
        </NavLink>
      </div>
    </div>
    </div>
  );
}
