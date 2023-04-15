import React, { useState, useEffect } from "react";
import "./EventDetails.css";
import { MdOutlineGroups } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Footer from "../../components/Footer/Footer";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(0);
  const [alreadyGroupRegistered, setAlreadyGroupRegistered] = useState(0);
  const [grpRegisterDone, setGrpRegisterDone] = useState(false);

  const token = Cookies.get("token");

  const [groupEmails, setGroupEmails] = useState([""]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const eventId = decodeURIComponent(urlParams.get("eventId"));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/events/eventDetails?eventId=${eventId}`
        );
        setEventDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  console.log(eventDetails);

  async function registerToEvent() {
    if (!token) {
      window.location.href = "/login";
    } else {
      console.log("Registered to event with id");
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}/events/register?eventId=${eventId}`,
          {
            eventId: eventDetails.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        console.log("Registered to event with id");
        setGrpRegisterDone(true);
        if (response.data.status === "success") {
          setAlreadyRegistered(1);
        }
        if (response.data.status === "failure") {
          setAlreadyRegistered(2);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function registrationClassName(alreadyRegistered) {
    if (alreadyRegistered === 0) {
      return "register-visible";
    } else if (alreadyRegistered === 1) {
      return "register-invisible";
    } else if (alreadyRegistered === 2) {
      return "register-notvisible";
    }
  }
  function registrationString(alreadyRegistered) {
    if (alreadyRegistered === 0) {
      return "Register";
    } else if (alreadyRegistered === 1) {
      return "Registered";
    } else if (alreadyRegistered === 2) {
      return "Already Registered";
    }
  }
  function registrationGroupString(alreadyRegistered) {
    if (alreadyRegistered === 0) {
      return "Register as Group";
    } else if (alreadyRegistered === 1) {
      return "Registered Group";
    } else if (alreadyRegistered === 2) {
      return "Already Registered";
    }
  }
  function convertUtcToLocal(eventDate) {
    const utcDate = new Date(eventDate);
    const etTime = utcDate.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });
    const [time, meridiem] = etTime.split(" ");
    const date = utcDate.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    });
    return `${date} ${time} ${meridiem}`;
  }

  function openCreateOrgForm() {
    setIsFormOpen(true);
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      setIsFormOpen(false);
    }
  }

  async function registerAsGroup(e) {
    e.preventDefault();
    const groupEmailsInStrings = groupEmails.join(",");
    const groupData = {
      groupEmails: groupEmailsInStrings,
    };
    setIsFormOpen(false);
    setGroupEmails([""]);

    await Axios.post(
      `${process.env.REACT_APP_BASE_URL}/events/registerGroup?eventId=${eventDetails.id}`,
      groupData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        console.log("Registered group to event with id");
        setGrpRegisterDone(true);
        if (response.data.status === "success") {
          setAlreadyGroupRegistered(1);
        }
        if (response.data.status === "failure") {
          setAlreadyGroupRegistered(2);
        }
        console.log("Registered to event with id");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("group registered", groupData, eventDetails.id);
  }

  const handleAddEmail = () => {
    setGroupEmails([...groupEmails, ""]);
  };

  const handleRemoveEmail = (index) => {
    setGroupEmails(groupEmails.filter((email, i) => i !== index));
  };

  const handleEmailChange = (index, event) => {
    const newEmails = [...groupEmails];
    newEmails[index] = event.target.value;
    setGroupEmails(newEmails);
  };

  return (
    <div>
      <div className="event-details-page" onClick={handleOverlayClick}>
        <div className="event-details-left">
          <img src={eventDetails.posterLink} alt={eventDetails.eventName} />
          <p className="event-time">
            {convertUtcToLocal(eventDetails.eventAtUtc)}
          </p>
          <p className="entry-Fee">Entry Fee: ${eventDetails.entryFee}</p>
          <p className="event-location">
            <MdLocationOn className="location-icon" /> Venue:{" "}
            {eventDetails.eventLocation}
          </p>
        </div>
        <div className="event-details-right">
          <h1 className="event-name">{eventDetails.eventName}</h1>
          <h4 className="club-name">{eventDetails.orgName}</h4>
          <p className="event-description">{eventDetails.eventDetails}</p>
          <p className="event-features">
            Category: {eventDetails.categoryName} | Food:{" "}
            {eventDetails.food === 0 && "Veg"}
            {eventDetails.food === 1 && "Non-veg"}
            {eventDetails.food === 2 && "Both Veg & Non-Veg"} | Theme:{" "}
            {eventDetails.ifOfficial ? "Official" : "Un Official"} | Event Type:{" "}
            {eventDetails.eventType === 0 && "Online"}
            {eventDetails.eventType === 1 && "Offline"}
            {eventDetails.eventType === 2 && "Both Online & Offline"}
          </p>
          <ul className="event-availabilities">
            <li
              className={
                eventDetails.ifFreeGoodies ? "feature-tick" : "feature-cross"
              }
            >
              Free Goodies
            </li>
            <li
              className={
                eventDetails.ifAlcohol ? "feature-tick" : "feature-cross"
              }
            >
              Alcohol
            </li>
            <li
              className={
                eventDetails.ifGuide ? "feature-tick" : "feature-cross"
              }
            >
              Guide Available
            </li>
            <li
              className={
                eventDetails.ifDifferentlyAbledAccessibility
                  ? "feature-tick"
                  : "feature-cross"
              }
            >
              Differently-Abled Accessibility
            </li>
            <li
              className={
                eventDetails.ifParking ? "feature-tick" : "feature-cross"
              }
            >
              Parking Available
            </li>
            <li
              className={
                eventDetails.ifPetsAllowed ? "feature-tick" : "feature-cross"
              }
            >
              Pets Allowed
            </li>
            <li
              className={
                eventDetails.ifRegisterAsGroup
                  ? "feature-tick"
                  : "feature-cross"
              }
            >
              Register As Group
            </li>
            <li
              className={
                eventDetails.ifRideTogether ? "feature-tick" : "feature-cross"
              }
            >
              Ride Together
            </li>
          </ul>
          <div className="registration-buttons">
            <Button
              variant="contained"
              endIcon={<CiBookmark />}
              onClick={registerToEvent}
              className={
                registrationClassName(alreadyRegistered)
                // alreadyRegistered ? "register-invisible" : "register-visible"
              }
            >
              {registrationString(alreadyRegistered)}
            </Button>
            <Button
              variant="contained"
              endIcon={<MdOutlineGroups />}
              onClick={openCreateOrgForm}
              className={registrationClassName(alreadyGroupRegistered)}
            >
              {registrationGroupString(alreadyGroupRegistered)}
            </Button>
          </div>
          <div>
            {isFormOpen && (
              <div className="overlay">
                <div className="form">
                  <div className="header">
                    <h3>Enter Your Group Details</h3>
                    <button onClick={() => setIsFormOpen(false)}>X</button>
                  </div>
                  <form
                    className="group-register-form"
                    onSubmit={registerAsGroup}
                  >
                    {groupEmails.map((email, index) => (
                      <div key={index}>
                        <label>Email ID:</label>
                        <input
                          type="text"
                          value={email}
                          placeholder="Enter Email ID of your companion"
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
                    <div className="email-add">
                      <button
                        type="button"
                        onClick={handleAddEmail}
                        className="add-email"
                      >
                        Add email
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="grp-register-btn"
                      disabled={grpRegisterDone}
                    >
                      Register As Group
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
