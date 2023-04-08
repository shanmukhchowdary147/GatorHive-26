import React, { useState, useEffect } from "react";
import "./StudentOrgs.css";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";
import Footer from "../../components/Footer/Footer";

function StudentOrgs() {
  const token = Cookies.get("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  const [orgName, setClubName] = useState("");
  const [subscribedClubs, setSubscribedClubs] = useState([]);
  const [clubData, setClubData] = useState([]);
  const [clubDataOrg, setClubDataOrg] = useState([]);

  const imagePaths = [
    require("../../images/bg4.jpg"),
    require("../../images/bg5.jpg"),
    require("../../images/bg3.jpg"),
  ];

  function randomImagePath() {
    return imagePaths[Math.floor(Math.random() * imagePaths.length)];
  }

  useEffect(() => {
    const getSubscribedClubs = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/studentOrg/subscribed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscribedClubs(response.data.map((obj) => obj.id)); // extract the id values
        console.log(subscribedClubs);
      } catch (error) {
        console.error(error);
      }
    };
    getSubscribedClubs();
  }, []);

  useEffect(() => {
    const getAllStudentOrgs = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/studentOrg/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClubDataOrg(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllStudentOrgs();
  }, []);

  useEffect(() => {
    setClubData(
      clubDataOrg.map((obj) => {
        return {
          ...obj,
          imagePath: randomImagePath(),
        };
      })
    );
  }, [clubDataOrg]);

  // console.log(clubData);

  const [secondaryEmails, setSecondaryEmails] = useState([""]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  function subscribeToClub(clubId) {
    console.log("Subscribed to club with id", clubId);
    console.log(clubId);
    // console.log(`http://localhost:8000/studentOrg/subscribe?orgId=${clubId}`);
    const subscribeToClub = async () => {
      try {
        const response = await Axios.put(
          `${process.env.REACT_APP_BASE_URL}/studentOrg/subscribe?orgId=${clubId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    };
    subscribeToClub();
    setSubscribedClubs([...subscribedClubs, clubId]);
  }
  function unsubscribeFromClub(clubId) {
    console.log("Unsubscribed from club with id", clubId);
    setSubscribedClubs(subscribedClubs.filter((id) => id !== clubId));
  }

  function openCreateOrgForm() {
    setIsFormOpen(true);
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      setIsFormOpen(false);
    }
  }

  async function createNewOrg(e) {
    e.preventDefault();
    const secondaryEmailInStrings = secondaryEmails.join(",");
    const newOrgData = {
      clubName: orgName,
      secondaryEmail: secondaryEmailInStrings,
    };
    console.log(newOrgData);
    setIsFormOpen(false);
    setSecondaryEmails([""]);

    await Axios.post(
      `${process.env.REACT_APP_BASE_URL}/studentOrg/create`,
      newOrgData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        console.log("Registered to event with id");
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }

  const handleSearchOrg = (event) => {
    event.preventDefault();
    const filteredClubData = clubData.filter((card) =>
      card.orgName.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div>
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
          <button className="create-org-btn" onClick={openCreateOrgForm}>
            Create an Organization
          </button>
          {isFormOpen && (
            <div className="overlay">
              <div className="form">
                <div className="header">
                  <h2>Create Organization</h2>
                  <button onClick={() => setIsFormOpen(false)}>X</button>
                </div>
                <form className="create-orgs-form" onSubmit={createNewOrg}>
                  <label>Organization Name:</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setClubName(e.target.value)}
                    placeholder="Enter Club Name"
                  />
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
              card.orgName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((card, index) => (
              <div key={index} className="org-card">
                <img src={card.imagePath} alt={`Card ${index}`} />
                <div className="org-card-info">
                  <span>{card.orgName}</span>
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
      <Footer />
    </div>
  );
}

export default StudentOrgs;
