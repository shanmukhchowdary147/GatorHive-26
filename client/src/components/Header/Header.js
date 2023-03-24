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
            <a href="/account/home">My profile</a>
            <a href="/account/edit">Edit Profile</a>
            <a href="/account/upcoming">Upcoming Events</a>
            <a href="/account/attended">Events Registered</a>
            <a href="/account/hosted">Events Hosted</a>
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
