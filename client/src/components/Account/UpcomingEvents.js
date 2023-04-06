import React, { useState } from "react";
import "./UpcomingEvents.css";

function UpcomingEvents() {
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
                <button className="upcoming-event-tag">#{event.categoryName}</button>
              </div>

              <div className="upcoming-event-club">{event.clubName}</div>
              <div className="upcoming-event-date">
                Date: {event.eventDate} 
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