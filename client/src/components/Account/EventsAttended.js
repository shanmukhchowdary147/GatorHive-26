import React, { useState } from "react";
import "./EventsAttended.css";

function EventsAttended() {
  const eventsData = [
    {
      id: 1,
      eventName: "Football Event",
      categoryName: "sports",
      posterLink:
        "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
      clubName: "UF Sports CLub",
      eventLocation: "UF Campus, Norman Hall",
      eventDetails:
        "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
      eventDate: "2023-04-15",
    },

    {
      id: 2,
      eventName: "Research Celebration",
      categoryName: "academic",
      posterLink:
        "https://xray.ufl.edu/wordpress/files/2023/02/research-day-450x600.png",
      clubName: "Gators Research Club",
      eventLocation: "UF Campus, Norman Hall",
      eventDetails:
        "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft.",
      eventDate: "2023-04-20",
    },
    {
      id: 3,
      eventName: "Yukorvan Event",
      categoryName: "cultural",
      posterLink: "https://via.placeholder.com/150x150",
      clubName: "Club 3",
      eventLocation: "UF Campus, Norman Hall",
      eventDetails: "Event details 3",
      eventDate: "2023-04-25",
    },
  ];

  const [event, setEvents] = useState(eventsData);

  function handleEventCardClick(eventId) {
    window.location.href = `/event/${eventId}`;
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
            <div className="attended-event-image">
              <img src={event.posterLink} alt={event.eventName} />
            </div>
            <div className="attended-event-details-right">
              <div className="attended-eventname-tag">
                <h2>{event.eventName}</h2>
                <button className="attended-event-tag">#{event.categoryName}</button>
              </div>

              <div className="attended-event-club">{event.clubName}</div>
              <div className="attended-event-date">
                Date: {event.eventDate} 
              </div>
              <div className="attended-event-date">{event.eventLocation}</div>
              <div className="attended-event-details">{event.eventDetails}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsAttended;
