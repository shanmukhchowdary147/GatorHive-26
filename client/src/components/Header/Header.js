import React, { useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import "./Header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="sticky-header">
      <div className="logo">
        <a href="/">GatorHive</a>
      </div>
      <div className="header-ight-part">
        <AiFillNotification />
        <a href="/host-event" className="host-event-btn">
          Host an Event
        </a>
        <a href="/student-orgs" className="student-orgs-btn">
          Student Orgs
        </a>
        <div className="profile-dropdown" onClick={handleDropdown}>
          <button className="profile-btn">Profile</button>
          {showDropdown && (
            <div className="dropdown-content">
              <a href="/account/home">My profile</a>
              <a href="/account/edit">Edit Profile</a>
              <a href="/account/upcoming">Upcoming Events</a>
              <a href="/account/attended">Events Registered</a>
              <a href="/account/hosted">Events Hosted</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
