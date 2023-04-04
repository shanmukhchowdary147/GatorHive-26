import React from "react";
import "./EventDetails.css";
import { MdOutlineGroups } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import Button from "@mui/material/Button";

const eventDetails = {
  id: 3,
  name: "ST. Augustine Music Festival",
  category: "other",
  Location: "Norman Hall, UF",
  imageUrl:
    "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
  clubName: "UF NaviGators",
  theme: "other",
  food: 2,
  details:
    "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft, mellow melodies to foot-stomping beats that had the audience jumping out of their seats.",
  date: "2023-04-25",
  eventAtUtc: "12:00 PM",
  registrations: 5,
  ifPetsAllowed: true,
  entryFee: 200,
  ifGuide: true,
  ifDifferentlyAbledAccessibility: false,
  ifParking: true,
  ifAlcohol: false,
  ifRegisterAsGroup: true,
  eventType: 2,
  ifFreeGoodies: true,
  ifRideTogether: true,
};

const EventDetails = () => {
  return (
    <div className="event-details-page">
      <div className="event-details-left">
        <img src={eventDetails.imageUrl} alt={eventDetails.name} />
        <p className="event-time">
          {eventDetails.eventAtUtc} | {eventDetails.date}
        </p>
        <p className="entry-Fee">Entry Fee: ${eventDetails.entryFee}</p>
        <p className="event-location">Venue: {eventDetails.Location}</p>
      </div>
      <div className="event-details-right">
        <h1 className="event-name">{eventDetails.name}</h1>
        <h4 className="club-name">{eventDetails.clubName}</h4>
        <p className="event-description">{eventDetails.details}</p>
        <p className="event-features">
          Category: {eventDetails.category} | Food:{" "}
          {eventDetails.food === 0 && "Veg"}
          {eventDetails.food === 1 && "Non-veg"}
          {eventDetails.food === 2 && "Both Veg & Non-Veg"} | Theme:{" "}
          {eventDetails.theme} | Event Type:{" "}
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
          <Button variant="contained" endIcon={<CiBookmark />}>
            Register For Event
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
