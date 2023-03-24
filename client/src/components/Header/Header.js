import React, { useState } from 'react';
import './Header.css';

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
      <a href="/hostevent" className="host-event">
        Host an Event
      </a>
      <div className="profile-dropdown" onClick={handleDropdown}>
        <button className="profile-btn">Profile</button>
        {showDropdown && (
          <div className="dropdown-content">
            <a href="/account/profile">My Profile</a>
            <a href="/account/events-registered">Events Registered</a>
            <a href="/account/events-hosted">Events Hosted</a>
            <a href="/account/my-calendar">My Calendar</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
