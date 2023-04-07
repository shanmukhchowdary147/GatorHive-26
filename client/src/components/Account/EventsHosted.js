import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EventsHosted.css";
import Cookies from "js-cookie";

function EventsHosted() {
  const token = Cookies.get("token");

  const [event, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/users/hostedEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setEvents(response.data);
    });
  }, []);
  function handleEventCardClick(eventId) {
    window.location.href = `/event?eventId=${encodeURIComponent(eventId)}`;
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
  return (
    <div className="App">
      <h1>Events Hosted</h1>
      <div className="attended-event-list">
        {event.map((event) => (
          <div
            className="attended-event-card"
            key={event.id}
            onClick={() => handleEventCardClick(event.id)}
          >
            <div className="upcoming-event-image">
              <img src={event.posterLink} alt={event.eventName} />
              <div className="xxzz">
                <div>{event.eventName}</div>
                <div className="upcoming-event-date">
                  Date: {convertUtcToLocal(event.eventAtUtc)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsHosted;
