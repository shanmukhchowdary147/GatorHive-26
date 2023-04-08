import "./HostEvent.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import axiosRetry from "axios-retry";
import Footer from "../../components/Footer/Footer";

function HostEventPage() {
  const token = Cookies.get("token");
  if (!token) {
    return <Redirect to="/login" />;
  }
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [category, setCategory] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [club, setClub] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [timings, setTimings] = useState("");
  const [theme, setTheme] = useState("");

  const [capacity, setCapacity] = useState("");
  const [isFree, setIsFree] = useState("");
  const [allowGroupRegistration, setAllowGroupRegistration] = useState(false);
  const [carpooling, setCarpooling] = useState(false);
  const [alcoholAllowed, setAlcoholAllowed] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [food, setFoodOption] = useState("");
  const [isDiffAccess, setIsDiffAccess] = useState(false);
  const [guideAvailable, setGuideAvailable] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [isPetAllowed, setIsPetAllowed] = useState(false);
  const [hostableClub, setHostableClub] = useState("");
  const [hostableClubs, setHostableClubs] = useState([]);
  const [eventCreated, setEventCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function createEventAtUtc(eventDate, timings) {
    // Combine eventDate and timings into a single string
    const eventDateTimeString = `${eventDate}T${timings}:00.000`;

    // Create a new Date object with the combined string and current timezone
    const eventAtCurrentTimezone = new Date(eventDateTimeString);

    // Get the UTC time in ISO format
    const eventAtUtcIso = eventAtCurrentTimezone;

    // Create a new Date object with the UTC time
    const eventAtUtc = new Date(eventAtUtcIso);

    return eventAtUtc;
  }

  // console.log(eventAtUtc.toUTCString()); // Display the time in UTC format

  const handleSubmit = async (event) => {
    if (hostableClub === "" || hostableClub === "empty") {
      event.preventDefault();
      setErrorMessage(
        <p style={{ color: "red" }}>
          *Select an org, or else go create an org in student org page
        </p>
      );
      console.log("error", "top");
    } else {
      event.preventDefault();
      setErrorMessage(null);
      const eventAtUtc = createEventAtUtc(eventDate, timings);

      if (isOnline === true) {
        setEventLocation("");
      }

      const eventData = {
        eventName: eventName,
        category: category,
        clubName: club,
        ifOfficial: theme === "official" ? true : false,
        food:
          food === "Veg"
            ? 0
            : food === "Non-Veg"
            ? 1
            : food === "Non-Veg/Veg"
            ? 2
            : null,
        eventDetails: eventDetails,
        eventAtUtc: eventAtUtc,
        ifPetsAllowed: isPetAllowed,
        entryFee: entryFee,
        ifGuide: guideAvailable,
        ifDifferentlyAbledAccessibility: isDiffAccess,
        ifParking: parkingAvailable,
        ifAlcohol: alcoholAllowed,
        ifRegisterAsGroup: allowGroupRegistration,
        eventType:
          eventType === "Online"
            ? 0
            : eventType === "Offline"
            ? 1
            : eventType === "Hybrid"
            ? 2
            : null,
        ifFreeGoodies: isFree,
        ifRideTogether: carpooling,
        studentOrgId: hostableClub,
      };
      const address = {
        roomNumber: eventLocation,
      };
      const newEventData = new FormData();
      newEventData.append("posterLink", posterImage);
      newEventData.append("eventData", JSON.stringify(eventData));
      newEventData.append("address", JSON.stringify(address));

      console.log("data:", JSON.parse(newEventData.get("eventData")));
      console.log("addres", JSON.parse(newEventData.get("address")));
      const axiosInstance = Axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}`,
      });

      axiosRetry(axiosInstance, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
      });

      const response = await axiosInstance
        .post("/events/create", newEventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEventCreated(true);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // ----submit end---->

  const handleImageChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  useEffect(() => {
    const fetchHostableClubs = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/studentOrg/hostableOrgs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("hostable", response.data);
        setHostableClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHostableClubs();
  }, []);

  useEffect(() => {
    if (
      Array.isArray(hostableClubs) &&
      hostableClubs.length === 0 &&
      errorMessage !== null
    ) {
      setErrorMessage(
        <p style={{ color: "red" }}>
          *Select an org, or else go create an org in student org page
        </p>
      );
      console.log("error", errorMessage ? "yes" : "no");
    } else {
      setErrorMessage(null);
    }
  }, [hostableClubs]);

  const hostableClubOptions = hostableClubs.map((hostableClub) => (
    <option key={hostableClub.id} value={hostableClub.id} required>
      {hostableClub.orgName}
    </option>
  ));

  return (
    <div className="host-event-main">
      <div className="host-event-cont">
        <h1 className="host-event-heading">Host an Event</h1>
        <form onSubmit={handleSubmit} className="eventHost-form">
          <div className="host-main-cont">
            <div className="host-left-box">
              <label>
                Event Name:
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </label>
              <br />
              <label>
                <div className="host-event-details">
                  Event Details:
                  <textarea
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                  />
                </div>
              </label>
              <br />
              <label>
                Event Location:
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  disabled={eventType === "Online"}
                />
              </label>
              <label>
                Event type:
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
              <br />
              <label>
                Event Date:
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </label>
              <br />
              <label>
                Entry Fee:
                <input
                  type="number"
                  value={entryFee}
                  placeholder="$"
                  onChange={(e) => setEntryFee(e.target.value)}
                />
              </label>
              <br />
              <label className="event-capacity">
                Capacity:
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  min="0"
                />
                <div>
                  <input
                    type="checkbox"
                    checked={!capacity}
                    onChange={() => setCapacity("")}
                  />{" "}
                  Unlimited
                </div>
              </label>
              <br />
              <label>
                Start Time:
                <input
                  type="time"
                  value={timings}
                  onChange={(e) => setTimings(e.target.value)}
                  required
                />
              </label>

              <label>
                Category:
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="music">Music</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="academic">Academic</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="social">Social</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />
            </div>

            <div className="host-right-box">
              <label>
                Poster Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </label>
              <br />
              <label>
                Org Name:
                <select
                  value={hostableClub}
                  onChange={(e) => setHostableClub(e.target.value)}
                  required
                >
                  <option value="empty">Select a Club</option>
                  {hostableClubOptions}
                </select>
              </label>
              {/* <br /> */}
              {errorMessage}
              <br />
              <label>
                Theme:
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="">Select a Theme</option>
                  <option value="Official">Official</option>
                  <option value="Unofficial">Unofficial</option>
                </select>
              </label>
              <br />
              <label>
                Food:
                <select
                  value={food}
                  onChange={(e) => setFoodOption(e.target.value)}
                >
                  <option value="">Select Food Options</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Non-Veg/Veg">Both Veg/Non-Veg</option>
                </select>
              </label>
              <br />
              <label>
                Allow Register as Group:
                <input
                  type="checkbox"
                  checked={allowGroupRegistration}
                  onChange={() =>
                    setAllowGroupRegistration(!allowGroupRegistration)
                  }
                />
              </label>
              <br />
              <label>
                Ridetogether:
                <input
                  type="checkbox"
                  checked={carpooling}
                  onChange={() => setCarpooling(!carpooling)}
                />
              </label>
              <br />
              <label>
                Guide Available:
                <input
                  type="checkbox"
                  checked={guideAvailable}
                  onChange={() => setGuideAvailable(!guideAvailable)}
                />
              </label>
              <br />
              <label>
                Parking Available:
                <input
                  type="checkbox"
                  checked={parkingAvailable}
                  onChange={() => setParkingAvailable(!parkingAvailable)}
                />
              </label>
              <br />
              <label>
                Alcohol Allowed:
                <input
                  type="checkbox"
                  checked={alcoholAllowed}
                  onChange={() => setAlcoholAllowed(!alcoholAllowed)}
                />
              </label>
              <br />
              <label>
                Differently Abled Accesibility:
                <input
                  type="checkbox"
                  checked={isDiffAccess}
                  onChange={() => setIsDiffAccess(!isDiffAccess)}
                />
              </label>
              <br />
              <label>
                Pet Allowed:
                <input
                  type="checkbox"
                  checked={isPetAllowed}
                  onChange={() => setIsPetAllowed(!isPetAllowed)}
                  v
                />
              </label>
              <br />
              <label>
                Free Goodies:
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={() => setIsFree(!isFree)}
                />
              </label>
              <button
                type="submit"
                className={
                  !eventCreated ? "create-event-btn" : "event-already-created"
                }
                disabled={eventCreated}
              >
                {!eventCreated
                  ? "Create Event"
                  : "Event Succesfully Created !!"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
export default HostEventPage;
