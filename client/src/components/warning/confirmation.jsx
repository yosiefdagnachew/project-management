import React from "react";
import "../../styles/confirm.css";
import { HiOutlineUserRemove } from "react-icons/hi";

export default function Confirmation({ setConfirmed }) {
  const onConfirm = () => {
    setConfirmed(true);
  };

  const onCancel = () => {
    setConfirmed(false);
  };

  return (
    <div className="confirmation">
      <div>
        <div className="content">
          <HiOutlineUserRemove className="icon" />
          <p>
            Are you sure you want to remove this employee from the project? By
            removing the employee, they will no longer be part of the project
            team. All tasks currently assigned to this employee will be
            unassigned and become available for reassignment.
          </p>
        </div>
        <div className="btns">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
