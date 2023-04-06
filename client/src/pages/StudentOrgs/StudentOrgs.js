import React, { useState } from "react";
import "./StudentOrgs.css";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function StudentOrgs() {
  const token = Cookies.get("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  const [subscribedClubs, setSubscribedClubs] = useState([6, 4]);
  const [clubData, setClubData] = useState([
    { id: 1, clubName: "AC Milan", imagePath: require("../../images/bg5.jpg") },
    {
      id: 2,
      clubName: "Real Madrid",
      imagePath: require("../../images/bg5.jpg"),
    },
    {
      id: 3,
      clubName: "Manchester United",
      imagePath: require("../../images/bg3.jpg"),
    },
    {
      id: 4,
      clubName: "FC Barcelona",
      imagePath: require("../../images/bg4.jpg"),
    },
    {
      id: 5,
      clubName: "Liverpool",
      imagePath: require("../../images/bg4.jpg"),
    },
    { id: 6, clubName: "Juventus", imagePath: require("../../images/bg4.jpg") },
    {
      id: 7,
      clubName: "Bayern Munich",
      imagePath: require("../../images/bg4.jpg"),
    },
    {
      id: 8,
      clubName: "Paris Saint-Germain",
      imagePath: require("../../images/bg4.jpg"),
    },
    { id: 9, clubName: "Chelsea", imagePath: require("../../images/bg4.jpg") },
    { id: 10, clubName: "Arsenal", imagePath: require("../../images/bg4.jpg") },
  ]);

  const [secondaryEmails, setSecondaryEmails] = useState([""]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  function subscribeToClub(clubId) {
    console.log("Subscribed to club with id", clubId);
    setSubscribedClubs([...subscribedClubs, clubId]);
  }
  function unsubscribeFromClub(clubId) {
    console.log("Unsubscribed from club with id", clubId);
    setSubscribedClubs(subscribedClubs.filter((id) => id !== clubId));
  }

  function handleButtonClick() {
    setIsFormOpen(true);
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      setIsFormOpen(false);
    }
  }

  const redirectToCreateOrg = () => {
    window.location.href = "/create-org";
  };

  const handleSearchOrg = (event) => {
    event.preventDefault();
    const filteredClubData = clubData.filter((card) =>
      card.clubName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setClubData(filteredClubData);
  };

  const handleAddEmail = () => {
    setSecondaryEmails([...secondaryEmails, ""]);
  };

  const handleRemoveEmail = (index) => {
    setSecondaryEmails(secondaryEmails.filter((email, i) => i !== index));
  };

  const handleEmailChange = (index, event) => {
    const newEmails = [...secondaryEmails];
    newEmails[index] = event.target.value;
    setSecondaryEmails(newEmails);
  };
  return (
    <div className="student-orgs" onClick={handleOverlayClick}>
      <div className="first-row">
        <h1>Student Organizations</h1>
        <form className="search-orgs" onSubmit={handleSearchOrg}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
        <button className="create-org" onClick={handleButtonClick}>
          Create an Organization
        </button>
        {isFormOpen && (
          <div className="overlay">
            <div className="form">
              <div className="header">
                <h2>Create Organization</h2>
                <button onClick={() => setIsFormOpen(false)}>X</button>
              </div>
              <form className="create-orgs-form">
                <label>Organization Name:</label>
                <input type="text" required />
                <br />
                {secondaryEmails.map((email, index) => (
                  <div key={index}>
                    <label>Secondary Email ID:</label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Can create events for your Org"
                      onChange={(event) => handleEmailChange(index, event)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(index)}
                        className="remove-email"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="add-email"
                >
                  Add another email
                </button>
                <button type="submit" className="create-button">
                  Register Organization
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="org-cards">
        {clubData
          .filter((card) =>
            card.clubName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((card, index) => (
            <div key={index} className="org-card">
              <img src={card.imagePath} alt={`Card ${index}`} />
              <div className="org-card-info">
                <span>{card.clubName}</span>
                {subscribedClubs.includes(card.id) ? (
                  <button
                    className="unsubscribe-button"
                    onClick={() => unsubscribeFromClub(card.id)}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    className="subscribe-button"
                    onClick={() => subscribeToClub(card.id)}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StudentOrgs;
