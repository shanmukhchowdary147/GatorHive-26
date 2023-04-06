import React, { useState, useEffect } from "react";
import "./EventDetails.css";
import { MdOutlineGroups } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(0);
  const token = Cookies.get("token");

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const eventId = decodeURIComponent(urlParams.get("eventId"));
  // console.log(http://localhost:8000/events/eventDetails?eventId=${eventId}});

  // useEffect(() => {
  //   Axios.get(`http://localhost:8000/events/eventDetails?eventId=${eventId}}`)
  //     .then((response) => {
  //       setEventDetails(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [eventId]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/events/eventDetails?eventId=${eventId}`
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
          `http://localhost:8000/events/register?eventId=${eventId}`,
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

  return (
    <div className="event-details-page">
      <div className="event-details-left">
        <img src={eventDetails.posterLink} alt={eventDetails.eventName} />
        <p className="event-time">{eventDetails.eventAtUtc}</p>
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
            className={eventDetails.ifGuide ? "feature-tick" : "feature-cross"}
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
              eventDetails.ifRegisterAsGroup ? "feature-tick" : "feature-cross"
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
            className={
              eventDetails.ifRegisterAsGroup
                ? "group-register-visible"
                : "group-register-invisible"
            }
          >
            Register As Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
