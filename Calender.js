import React from "react";
import comingSoon from "../assets/building.png";

function Calender() {
  return (
    <>
      <div className="dashboard" id="dashboard">
        <div className="calender" id="calender">
          <div className="calender-wrapper">
            <h3>This feature will be available soon...</h3>
            <img src={comingSoon} alt="coming soon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Calender;
