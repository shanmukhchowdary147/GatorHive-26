import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EventsHosted.css";
import Cookies from "js-cookie";

function EventsHosted() {
  const token = Cookies.get("token");
  // const [eventsData,setEventsData = useState([]);
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
    Axios.get("http://localhost:8000/users/hostedEvents", {
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
      <div className="hosted-event-list">
        {event.map((event) => (
          <div
            className="hosted-event-card"
            key={event.id}
            onClick={() => handleEventCardClick(event.id)}
          >
            <div className="hosted-event-image">
              <img src={event.posterLink} alt={event.eventName} />
            </div>
            <div className="hosted-event-details-right">
              <div className="hosted-eventname-tag">
                <h2>{event.eventName}</h2>
                <button className="hosted-event-tag">
                  #{event.categoryName}
                </button>
              </div>

              <div className="hosted-event-club">{event.orgName}</div>
              <div className="hosted-event-date">
                Date: {convertUtcToLocal(event.eventAtUtc)}
              </div>
              <div className="hosted-event-date">{event.eventLocation}</div>
              <div className="hosted-event-details">{event.eventDetails}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsHosted;
