import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import "./UpcomingEvents.css";

function UpcomingEvents() {
  const token = Cookies.get("token");
  // const eventsData = [
  //   {
  //     id: 1,
  //     eventName: "Football Event",
  //     categoryName: "sports",
  //     posterLink:
  //       "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
  //     clubName: "UF Sports CLub",
  //     eventLocation: "UF Campus, Norman Hall",
  //     eventDetails:
  //       "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
  //     eventDate: "2023-04-15",
  //   },

  //   {
  //     id: 2,
  //     eventName: "Research Celebration",
  //     categoryName: "academic",
  //     posterLink:
  //       "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
  //     clubName: "Gators Research Club",
  //     eventLocation: "UF Campus, Norman Hall",
  //     eventDetails:
  //       "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
  //     eventDate: "2023-04-20",
  //   },
  // ];

  const [event, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/users/registeredEvents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const filteredEvents = response.data.filter((event) => {
        const eventDate = new Date(event.eventAtUtc);
        const today = new Date();
        return eventDate >= today;
      });
      setEvents(response.data);
    });
  }, []);

  function handleEventCardClick(eventId) {
    window.location.href = `/event?eventId=${encodeURIComponent(eventId)}`;
  }

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
      <h1>Upcoming Events</h1>
      <div className="upcoming-event-list">
        {event.map((event) => (
          <div
            className="upcoming-event-card"
            key={event.id}
            onClick={() => handleEventCardClick(event.id)}
          >
            <div className="upcoming-event-image">
              <img src={event.posterLink} alt={event.eventName} />
            </div>
            <div className="upcoming-event-details-right">
              <div className="upcoming-eventname-tag">
                <h2>{event.eventName}</h2>
                <button className="upcoming-event-tag">
                  #{event.categoryName}
                </button>
              </div>

              <div className="upcoming-event-club">{event.orgName}</div>
              <div className="upcoming-event-date">
                Date: {convertUtcToLocal(event.eventAtUtc)}
              </div>
              <div className="upcoming-event-date">{event.eventLocation}</div>
              <div className="upcoming-event-details">{event.eventDetails}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;
