import React from "react";
import '../../styles/error.css';
import { AiOutlineClose } from "react-icons/ai";
import {BiError} from 'react-icons/bi'

export default function Error({ message, setErrorMessage }) {
  const closIcon = () => {
    setErrorMessage("");
  };
  return (
    <div className="error-showing">
      <div className="close-box" onClick={closIcon}>
        <AiOutlineClose />
      </div>
      <div className="errorShowing">
        <BiError className="icon"/>
      <p>{message}</p>
      </div>
    </div>
  );
}
