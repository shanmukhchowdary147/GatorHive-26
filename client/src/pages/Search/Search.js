import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";

function SearchPage() {
  const eventsData = [
    {
      id: 1,
      name: "Event 1",
      category: "music",
      imageUrl: "https://via.placeholder.com/150x150",
      clubName: "Club 1",
      theme: "official",
      food: 0,
      details:
        "The music event was an electrifying experience that left the audience spellbound. The stage was adorned with colorful lights and a sound system that was capable of filling the entire venue with music that ranged from soft, mellow melodies to foot-stomping beats that had the audience jumping out of their seats.",
      date: "2023-04-15",
      eventAtUtc: "12:00:00",
      registrations: 10,
      ifPetsAllowed: true,
      entryFee: 0,
      ifGuide: true,
      ifDifferentlyAbledAccessibility: true,
      ifParking: true,
      ifAlcohol: false,
      ifRegisterAsGroup: true,
      eventType: 0,
      ifFreeGoodies: true,
      ifRideTogether: true,
    },
    {
      id: 2,
      name: "Event 2",
      category: "sports",
      imageUrl: "https://via.placeholder.com/150x150",
      clubName: "Club 2",
      theme: "unofficial",
      food: 1,
      details: "Event details 2",
      date: "2023-04-20",
      eventAtUtc: "12:00:00",
      registrations: 20,
      ifPetsAllowed: false,
      entryFee: 100,
      ifGuide: false,
      ifDifferentlyAbledAccessibility: true,
      ifParking: false,
      ifAlcohol: true,
      ifRegisterAsGroup: false,
      eventType: 1,
      ifFreeGoodies: false,
      ifRideTogether: false,
    },
    {
      id: 3,
      name: "Event 3",
      category: "other",
      imageUrl: "https://via.placeholder.com/150x150",
      clubName: "Club 3",
      theme: "other",
      food: 2,
      details: "Event details 3",
      date: "2023-04-25",
      eventAtUtc: "12:00:00",
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
    },
  ];

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchText = decodeURIComponent(urlParams.get("q"));

  const [events, setEvents] = useState(eventsData);
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [sortOption, setSortOption] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    veg: false,
    nonVeg: false,
    bothVegNonVeg: false,
    official: false,
    unofficial: false,
    music: false,
    sports: false,
    academic: false,
    volunteer: false,
    social: false,
    other: false,
    ifPetsAllowed: false,
    paid: false,
    unPaid: false,
    ifGuide: false,
    ifDifferentlyAbledAccessibility: false,
    ifParking: false,
    ifAlcohol: false,
    ifRegisterAsGroup: false,
    online: false,
    offline: false,
    hybrid: false,
    ifFreeGoodies: false,
    ifRideTogether: false,
  });

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: checked,
    });
  };

  // Function to filter events based on search query and filter options
  const filteredEvents = events.filter((event) => {
    const {
      veg,
      nonVeg,
      bothVegNonVeg,
      official,
      unofficial,
      music,
      sports,
      academic,
      volunteer,
      social,
      other,
      ifPetsAllowed,
      paid,
      unPaid,
      ifGuide,
      ifDifferentlyAbledAccessibility,
      ifParking,
      ifAlcohol,
      ifRegisterAsGroup,
      online,
      offline,
      hybrid,
      ifFreeGoodies,
      ifRideTogether,
    } = filterOptions;
    return (
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.clubName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!veg || event.food === 0) &&
      (!nonVeg || event.food === 1) &&
      (!bothVegNonVeg || event.food === 2) &&
      (!official || event.theme === "official") &&
      (!unofficial || event.theme === "unofficial") &&
      (!music || event.category === "music") &&
      (!sports || event.category === "sports") &&
      (!academic || event.category === "academic") &&
      (!volunteer || event.category === "volunteer") &&
      (!social || event.category === "social") &&
      (!other || event.category === "other") &&
      (!ifPetsAllowed || event.ifPetsAllowed === true) &&
      (!paid || event.entryFee > 0) &&
      (!unPaid || event.entryFee === 0) &&
      (!ifGuide || event.ifGuide === true) &&
      (!ifDifferentlyAbledAccessibility ||
        event.ifDifferentlyAbledAccessibility === true) &&
      (!ifParking || event.ifParking === true) &&
      (!ifAlcohol || event.ifAlcohol === true) &&
      (!ifRegisterAsGroup || event.ifRegisterAsGroup === true) &&
      (!online || event.eventType === 0) &&
      (!offline || event.eventType === 1) &&
      (!hybrid || event.eventType === 2) &&
      (!ifFreeGoodies || event.ifFreeGoodies === true) &&
      (!ifRideTogether || event.ifRideTogether === true)
    );
  });

  // Function to sort events based on sort option
  const sortedEvents = filteredEvents.sort((a, b) => {
    switch (sortOption) {
      case "popularity":
        return b.registrations - a.registrations;
      case "date":
        return new Date(a.date) - new Date(b.date);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  function handleEventCardClick(eventId) {
    window.location.href = `/events/${eventId}`;
  }

  return (
    <div className="search-page">
      <div className="left-box">
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <div className="sort-options">
          <label>
            Sort by:
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">--Select--</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
            </select>
          </label>
        </div>
        <div className="filter-options">
          <div className="left-left">
            <h4>Food:</h4>
            <label>
              <input
                type="checkbox"
                name="veg"
                checked={filterOptions.veg}
                onChange={handleFilterChange}
              />
              Veg
            </label>
            <label>
              <input
                type="checkbox"
                name="nonVeg"
                checked={filterOptions.nonVeg}
                onChange={handleFilterChange}
              />
              Non-Veg
            </label>
            <label>
              <input
                type="checkbox"
                name="bothVegNonVeg"
                checked={filterOptions.bothVegNonVeg}
                onChange={handleFilterChange}
              />
              Both Veg/Non-Veg
            </label>
            <label>
              <input
                type="checkbox"
                name="ifAlcohol"
                checked={filterOptions.ifAlcohol}
                onChange={handleFilterChange}
              />
              Alcohol
            </label>
            <h4>Theme:</h4>
            <label>
              <input
                type="checkbox"
                name="official"
                checked={filterOptions.official}
                onChange={handleFilterChange}
              />
              Official
            </label>
            <label>
              <input
                type="checkbox"
                name="unofficial"
                checked={filterOptions.unofficial}
                onChange={handleFilterChange}
              />
              Unofficial
            </label>

            <h4>Availability:</h4>
            <label>
              <input
                type="checkbox"
                name="ifGuide"
                checked={filterOptions.ifGuide}
                onChange={handleFilterChange}
              />
              Guide
            </label>
            <label>
              <input
                type="checkbox"
                name="ifPetsAllowed"
                checked={filterOptions.ifPetsAllowed}
                onChange={handleFilterChange}
              />
              Pets
            </label>
            <label>
              <input
                type="checkbox"
                name="ifDifferentlyAbledAccessibility"
                checked={filterOptions.ifDifferentlyAbledAccessibility}
                onChange={handleFilterChange}
              />
              Differently Abled Accessibility
            </label>
            <label>
              <input
                type="checkbox"
                name="ifParking"
                checked={filterOptions.ifParking}
                onChange={handleFilterChange}
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                name="ifRegisterAsGroup"
                checked={filterOptions.ifRegisterAsGroup}
                onChange={handleFilterChange}
              />
              Register As Group
            </label>
            <label>
              <input
                type="checkbox"
                name="ifFreeGoodies"
                checked={filterOptions.ifFreeGoodies}
                onChange={handleFilterChange}
              />
              Free Goodies
            </label>
            <label>
              <input
                type="checkbox"
                name="ifRideTogether"
                checked={filterOptions.ifRideTogether}
                onChange={handleFilterChange}
              />
              Ride Together
            </label>
          </div>
          <div className="left-right">
            <h4>Category </h4>
            <label>
              <input
                type="checkbox"
                name="music"
                checked={filterOptions.music}
                onChange={handleFilterChange}
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                name="sports"
                checked={filterOptions.sports}
                onChange={handleFilterChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="academic"
                checked={filterOptions.academic}
                onChange={handleFilterChange}
              />
              Academic
            </label>
            <label>
              <input
                type="checkbox"
                name="volunteer"
                checked={filterOptions.volunteer}
                onChange={handleFilterChange}
              />
              Volunteer
            </label>
            <label>
              <input
                type="checkbox"
                name="social"
                checked={filterOptions.social}
                onChange={handleFilterChange}
              />
              Social
            </label>
            <label>
              <input
                type="checkbox"
                name="other"
                checked={filterOptions.other}
                onChange={handleFilterChange}
              />
              Other
            </label>
            <h4>Entry Fee:</h4>
            <label>
              <input
                type="checkbox"
                name="paid"
                checked={filterOptions.paid}
                onChange={handleFilterChange}
              />
              Paid
            </label>
            <label>
              <input
                type="checkbox"
                name="unPaid"
                checked={filterOptions.unPaid}
                onChange={handleFilterChange}
              />
              Unpaid
            </label>
            <h4>Event Type:</h4>
            <label>
              <input
                type="checkbox"
                name="online"
                checked={filterOptions.online}
                onChange={handleFilterChange}
              />
              Online
            </label>
            <label>
              <input
                type="checkbox"
                name="offline"
                checked={filterOptions.offline}
                onChange={handleFilterChange}
              />
              Offline
            </label>
            <label>
              <input
                type="checkbox"
                name="hybrid"
                checked={filterOptions.hybrid}
                onChange={handleFilterChange}
              />
              Hybrid
            </label>
          </div>
        </div>
      </div>
      <div className="event-list">
        {sortedEvents.map((event) => (
          <div
            className="event-card"
            key={event.id}
            onClick={() => handleEventCardClick(event.id)}
          >
            <div className="event-image">
              <img src={event.imageUrl} alt={event.name} />
            </div>
            <div className="event-details">
              <div className="event-name">{event.name}</div>
              <div className="event-club">{event.clubName}</div>
              <div className="event-date">{event.date}</div>
              <div className="event-date">{event.eventAtUtc}</div>
              <div className="event-details">{event.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
