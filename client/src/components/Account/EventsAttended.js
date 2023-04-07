import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EventsAttended.css";
import Cookies from "js-cookie";

function EventsAttended() {
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
  //   {
  //     id: 3,
  //     eventName: "Yukorvan Event",
  //     categoryName: "cultural",
  //     posterLink: "https://via.placeholder.com/150x150",
  //     clubName: "Club 3",
  //     eventLocation: "UF Campus, Norman Hall",
  //     eventDetails: "Event details 3",
  //     eventDate: "2023-04-25",
  //   },
  // ];

  const [event, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/users/registeredEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const filteredEvents = response.data.filter((event) => {
        const eventDate = new Date(event.eventAtUtc);
        const today = new Date();
        return eventDate < today;
      });
      setEvents(filteredEvents);
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
      <h1>Events Attended</h1>
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

export default EventsAttended;
