import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { Button } from "react-bootstrap";
import Axios from "axios";
import Footer from "../../components/Footer/Footer";
import LinearProgress from "@mui/material/LinearProgress";

function SearchPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchText = decodeURIComponent(urlParams.get("q"));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response] = await Promise.all([
          Axios.get(`${process.env.REACT_APP_BASE_URL}/events/`),
        ]);
        setEvents(Object.values(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
    cultural: false,
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

  //Function to filter events based on search query and filter options
  // const filteredEvents = events.filter((event) => {
  //   const {
  //     veg,
  //     nonVeg,
  //     bothVegNonVeg,
  //     official,
  //     unofficial,
  //     music,
  //     sports,
  //     cultural,
  //     academic,
  //     volunteer,
  //     social,
  //     other,
  //     ifPetsAllowed,
  //     paid,
  //     unPaid,
  //     ifGuide,
  //     ifDifferentlyAbledAccessibility,
  //     ifParking,
  //     ifAlcohol,
  //     ifRegisterAsGroup,
  //     online,
  //     offline,
  //     hybrid,
  //     ifFreeGoodies,
  //     ifRideTogether,
  //   } = filterOptions;
  //   return (
  //     (event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       event.orgName.toLowerCase().includes(searchQuery.toLowerCase())) &&
  //     (!veg || event.food === 0) &&
  //     (!nonVeg || event.food === 1) &&
  //     (!bothVegNonVeg || event.food === 2) &&
  //     (!official || event.ifOfficial === 1) &&
  //     (!unofficial || event.ifOfficial === 0) &&
  //     (!music || event.categoryName === "music") &&
  //     (!sports || event.categoryName === "sports") &&
  //     (!cultural || event.categoryName === "cultural") &&
  //     (!academic || event.categoryName === "academic") &&
  //     (!volunteer || event.categoryName === "volunteer") &&
  //     (!social || event.categoryName === "social") &&
  //     (!other || event.categoryName === "other") &&
  //     (!ifPetsAllowed || event.ifPetsAllowed === 1) &&
  //     (!paid || event.entryFee > 0) &&
  //     (!unPaid || event.entryFee === 0) &&
  //     (!ifGuide || event.ifGuide === 1) &&
  //     (!ifDifferentlyAbledAccessibility ||
  //       event.ifDifferentlyAbledAccessibility === 1) &&
  //     (!ifParking || event.ifParking === 1) &&
  //     (!ifAlcohol || event.ifAlcohol === 1) &&
  //     (!ifRegisterAsGroup || event.ifRegisterAsGroup === 1) &&
  //     (!online || event.eventType === 0) &&
  //     (!offline || event.eventType === 1) &&
  //     (!hybrid || event.eventType === 2) &&
  //     (!ifFreeGoodies || event.ifFreeGoodies === 1) &&
  //     (!ifRideTogether || event.ifRideTogether === 1)
  //   );
  // });

  const filteredEvents = events.filter((event) => {
    const {
      veg,
      nonVeg,
      bothVegNonVeg,
      official,
      unofficial,
      music,
      sports,
      cultural,
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

    const food = event.food;
    const categoryName = event.categoryName;
    const entryFee = event.entryFee;
    const eventType = event.eventType;

    return (
      ((event.eventName &&
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.orgName &&
          event.orgName.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      ((!veg && !nonVeg && !bothVegNonVeg) ||
        (veg && food === 0) ||
        (nonVeg && food === 1) ||
        (bothVegNonVeg && food === 2)) &&
      ((!official && !unofficial) ||
        (official && event.ifOfficial === 1) ||
        (unofficial && event.ifOfficial === 0)) &&
      ((!music &&
        !sports &&
        !cultural &&
        !academic &&
        !volunteer &&
        !social &&
        !other) ||
        (music && categoryName === "music") ||
        (sports && categoryName === "sports") ||
        (cultural && categoryName === "cultural") ||
        (academic && categoryName === "academic") ||
        (volunteer && categoryName === "volunteer") ||
        (social && categoryName === "social") ||
        (other && categoryName === "other")) &&
      (!ifPetsAllowed || event.ifPetsAllowed === 1) &&
      ((!paid && !unPaid) ||
        (paid && entryFee > 0) ||
        (unPaid && entryFee === 0)) &&
      (!ifGuide || event.ifGuide === 1) &&
      (!ifDifferentlyAbledAccessibility ||
        event.ifDifferentlyAbledAccessibility === 1) &&
      (!ifParking || event.ifParking === 1) &&
      (!ifAlcohol || event.ifAlcohol === 1) &&
      (!ifRegisterAsGroup || event.ifRegisterAsGroup === 1) &&
      ((!online && !offline && !hybrid) ||
        (online && eventType === 0) ||
        (offline && eventType === 1) ||
        (hybrid && eventType === 2)) &&
      (!ifFreeGoodies || event.ifFreeGoodies === 1) &&
      (!ifRideTogether || event.ifRideTogether === 1)
    );
  });

  // Function to sort events based on sort option
  const sortedEvents = filteredEvents.sort((a, b) => {
    switch (sortOption) {
      case "popularity":
        return b.registrations - a.registrations;
      case "date":
        return new Date(a.eventDate) - new Date(b.eventDate);
      default:
        return a.eventName.localeCompare(b.eventName);
    }
  });

  function handleEventCardClick(eventId) {
    window.location.href = `/event?eventId=${encodeURIComponent(eventId)}`;
    // `/search?q=${encodeURIComponent(searchQuery)}`
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
    <div className="search-cont">
      <div className="search-page">
        <div className="left-box">
          <input
            type="text"
            placeholder="Search events...."
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
                  name="ifAlcohol"
                  checked={filterOptions.ifAlcohol}
                  onChange={handleFilterChange}
                />
                Alcohol
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
                  name="cultural"
                  checked={filterOptions.cultural}
                  onChange={handleFilterChange}
                />
                Cultural
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
          <LinearProgress />
          {sortedEvents.map((event) => (
            <div
              className="event-card"
              key={event.id}
              onClick={() => handleEventCardClick(event.id)}
            >
              <div className="event-image">
                <img src={event.posterLink} alt={event.eventName} />
              </div>
              <div className="event-details-right">
                <div className="eventname-tag">
                  <h2>{event.eventName}</h2>
                  <Button className="event-tag">#{event.categoryName}</Button>
                </div>

                <div className="event-club">{event.orgName}</div>
                <div className="event-date">${event.entryFee}</div>
                <div className="event-date">
                  Date: {convertUtcToLocal(event.eventAtUtc)}
                </div>
                <div className="event-date">{event.eventLocation}</div>
                <div className="event-details">{event.eventDetails}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-cont1">
        <Footer />
      </div>
    </div>
  );
}

export default SearchPage;
