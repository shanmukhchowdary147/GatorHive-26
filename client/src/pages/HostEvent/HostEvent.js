import "./HostEvent.css";
import React, { useState } from "react";

function HostEventPage() {
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

  const [food, setFoodOption] = useState("");
  const [isDiffAccess, setIsDiffAccess] = useState(false);
  const [guideAvailable, setGuideAvailable] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [isPetAllowed, setIsPetAllowed] = useState(false);

  const onlineEvent = () => {};
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
    console.log("Poster Image:", posterImage);
    console.log("Club:", club);
    console.log("Entry Fee:", entryFee);
    console.log("Theme:", theme);
    console.log("Capacity:", capacity);
    console.log("Free Stuff:", freeStuff);
    console.log("Allow Group Registration:", allowGroupRegistration);
    console.log("Carpooling:", carpooling);
    console.log("Alcohol Allowed:", alcoholAllowed);
    console.log("Guide:", guide);
    console.log("Has Parking:", hasParking);
    console.log("Pet Allowed:", petAllowed);
  };

  const handleImageChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  return (
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
                type="text"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
              />
            </label>
            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Social">Social</option>
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

            <br />
            <label>
              Theme:
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="">Select a Theme</option>
                <option value="Official">Official</option>
                <option value="Unofficial">Unofficial</option>
                <option value="other">Other</option>
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
            <button type="submit" className="create-event-btn">
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default HostEventPage;
