import React, { useState, useEffect } from "react";
import { AiFillNotification } from "react-icons/ai";
// import CampaignIcon from "@mui/icons-material/Campaign";
import "./Header.css";
import Cookies from "js-cookie";

function Header() {
  const [profile, setProfile] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setProfile("profile");
    } else {
      setProfile("login");
    }
  }, []);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  function handleLogout() {
    Cookies.remove("token");
  }

  return (
    <nav className="sticky-header">
      <div className="logo">
        <a href="/">GatorHive</a>
      </div>
      <div className="header-right-part">
        <a href="/host-event" className="host-event-btn">
          Host an Event
        </a>
        <a href="/student-orgs" className="student-orgs-btn">
          Student Orgs
        </a>
        {profile === "profile" ? (
          <div className="profile-dropdown" onClick={handleDropdown}>
            <button className="profile-btn">Profile</button>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="/account/home">My profile</a>
                <a href="/account/edit">Edit Profile</a>
                <a href="/account/upcoming">Upcoming Events</a>
                <a href="/account/attended">Events Attended</a>
                <a href="/account/hosted">Events Hosted</a>
                <a href="/login" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="profile-dropdown">
            <a href="/login">Login</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
