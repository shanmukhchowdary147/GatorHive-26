import "./HostEvent.css";
import React, { useState } from "react";

function HostEventPage() {
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [tags, setTags] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [club, setClub] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [theme, setTheme] = useState("");
  const [otherTheme, setOtherTheme] = useState("");
  const [capacity, setCapacity] = useState("");
  const [freeStuff, setFreeStuff] = useState("");
  const [allowGroupRegistration, setAllowGroupRegistration] = useState(false);
  const [carpooling, setCarpooling] = useState(false);
  const [alcoholAllowed, setAlcoholAllowed] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [guide, setGuide] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [isPrivateParty, setIsPrivateParty] = useState(false);
  const [petAllowed, setPetAllowed] = useState(false);
  const [guideAvailable, setGuideAvailable] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPetAllowed, setIsPetAllowed] = useState(false);

  const handleLocationChange = (event) => {
    if (event.target.checked) {
      setEventLocation("Online Event");
      setIsOnline(true);
    } else {
      setEventLocation("");
      setIsOnline(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you could make an API call to submit the form data and image to a server
    console.log("Event Name:", eventName);
    console.log("Event Details:", eventDetails);
    console.log("Event Location:", eventLocation);
    console.log("Is Online:", isOnline);
    console.log("Event Date:", eventDate);
    console.log("Tags:", tags);
    console.log("Poster Image:", posterImage);
    console.log("Club:", club);
    console.log("Entry Fee:", entryFee);
    console.log("Theme:", theme);
    console.log("Capacity:", capacity);
    console.log("Free Stuff:", freeStuff);
    console.log("Allow Group Registration:", allowGroupRegistration);
    console.log("Carpooling:", carpooling);
    console.log("Alcohol Allowed:", alcoholAllowed);
    console.log("Is Veg:", isVeg);
    console.log("Is Non-Veg:", isNonVeg);
    console.log("Guide:", guide);
    console.log("Has Parking:", hasParking);
    console.log("Is Private Party:", isPrivateParty);
    console.log("Pet Allowed:", petAllowed);
  };

  const handleImageChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  return (
    <div>
      <h1>Host an Event</h1>
      <form onSubmit={handleSubmit} className="eventHost-form">
        <div className="main-cont">
          <div className="left-box">
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
              Event Details:
              <textarea
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              />
            </label>
            <br />
            <label>
              Event Location:
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                disabled={isOnline}
              />
            </label>
            <label>
              Online Event:
              <input
                type="checkbox"
                checked={isOnline}
                onChange={handleLocationChange}
              />{" "}
            </label>
            <br />
            <label>
              Event Date:
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Private Party:
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
            </label>
            <br />
            <label>
              Entry Fee:
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
              />
            </label>
            <br />
            <label>
              Capacity:
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="0"
              />
              <input
                type="checkbox"
                checked={!capacity}
                onChange={() => setCapacity("")}
              />{" "}
              Unlimited
            </label>
            <br />
            <label>
              Carpooling:
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
          </div>

          <div className="right-box">
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
              Tags for Searching:
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
            <br />
            <label>
              Poster Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <br />
            <label>
              Club Name:
              <select value={club} onChange={(e) => setClub(e.target.value)}>
                <option value="">Select a Club</option>
                <option value="club1">Club 1</option>
                <option value="club2">Club 2</option>
                <option value="club3">Club 3</option>
              </select>
            </label>
            <br />

            <label>
              Theme:
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Select a Theme</option>
                <option value="formal">Formal</option>
                <option value="informal">Informal</option>
                <option value="other">Other</option>
              </select>
              {theme === "other" && (
                <input
                  type="text"
                  value={otherTheme}
                  onChange={(e) => setOtherTheme(e.target.value)}
                />
              )}
            </label>
            <br />
            <label>
              Free Stuff:
              <input
                type="text"
                value={freeStuff}
                onChange={(e) => setFreeStuff(e.target.value)}
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
              Vegetarian:
              <input
                type="checkbox"
                checked={isVeg}
                onChange={() => setIsVeg(!isVeg)}
              />
            </label>
            <br />
            <label>
              Non-Vegetarian:
              <input
                type="checkbox"
                checked={isNonVeg}
                onChange={() => setIsNonVeg(!isNonVeg)}
              />
            </label>
            <br />

            <label>
              Pet Allowed:
              <input
                type="checkbox"
                checked={isPetAllowed}
                onChange={() => setIsPetAllowed(!isPetAllowed)}
              />
            </label>
            <br />
            <button type="submit">Create Event</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default HostEventPage;
