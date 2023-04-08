import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import "./Calendar.css";

function Home() {
  const token = Cookies.get("token");
  const [events, setEvents] = useState([]);
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const [yesterdayEvents, setYesterdayEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [tomorrowEvents, setTomorrowEvents] = useState([]);
  const [calenderEvents, setCalenderEvents] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/users/registeredEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setEvents(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredEventsYest = events.filter((event) => {
      const eventDate = new Date(event.eventAtUtc);
      const today = new Date();
      const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      const yesterdayYear = yesterday.getFullYear();
      const yesterdayMonth = yesterday.getMonth();
      const yesterdayDay = yesterday.getDate();
      return (
        eventYear === yesterdayYear &&
        eventMonth === yesterdayMonth &&
        eventDay === yesterdayDay
      );
    });

    setYesterdayEvents(filteredEventsYest);

    //<------------shourya code

    const filteredEventsFuture = events.filter((event) => {
      const eventDate = new Date(event.eventAtUtc);
      const today = new Date();
      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      const tomorrowYear = tomorrow.getFullYear();
      const tomorrowMonth = tomorrow.getMonth();
      const tomorrowDay = tomorrow.getDate();
      const isTomorrow =
        eventYear === tomorrowYear &&
        eventMonth === tomorrowMonth &&
        eventDay >= tomorrowDay;
      return isTomorrow;
    });

    const eventWithCalenderDates = filteredEventsFuture.map((event) => {
      const eventDate = new Date(event.eventAtUtc);
      const eventCalenderDate = new Date(
        eventDate.toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        })
      );
      return {
        id: event.id,
        date: eventCalenderDate,
      };
    });

    setCalenderEvents(eventWithCalenderDates);

    //--------->shourya code

    const filteredEventsTod = events.filter((event) => {
      const eventDate = new Date(event.eventAtUtc);
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const isToday =
        eventDate.getTime() >= startOfToday.getTime() &&
        eventDate.getTime() < endOfToday.getTime();
      return isToday;
    });
    setTodayEvents(filteredEventsTod);

    const filteredEventsTom = events.filter((event) => {
      const eventDate = new Date(event.eventAtUtc);
      const today = new Date();
      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      const tomorrowYear = tomorrow.getFullYear();
      const tomorrowMonth = tomorrow.getMonth();
      const tomorrowDay = tomorrow.getDate();
      const isTomorrow =
        eventYear === tomorrowYear &&
        eventMonth === tomorrowMonth &&
        eventDay === tomorrowDay;
      return isTomorrow;
    });

    setTomorrowEvents(filteredEventsTom);
  }, [events]);

  const renderTitleRow = () => (
    <tr>
      <td colSpan="7" className="calendar-title">{`${monthName(
        month
      )} ${year}`}</td>
    </tr>
  );

  const renderDayNameRow = () => (
    <tr>
      <td className="calendar-dayname">Sun</td>
      <td className="calendar-dayname">Mon</td>
      <td className="calendar-dayname">Tue</td>
      <td className="calendar-dayname">Wed</td>
      <td className="calendar-dayname">Thu</td>
      <td className="calendar-dayname">Fri</td>
      <td className="calendar-dayname">Sat</td>
    </tr>
  );
  const renderDateRows = () => {
    const rows = [];
    let cells = [];
    const today = new Date();
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const id = `${year}-${month + 1}-${i}`;
      const currentDate = new Date(year, month, i);
      const isCurrentDate =
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const isEventDate = calenderEvents.some((calenderEvent) => {
        const eventDate = new Date(calenderEvent.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });
      cells.push(
        <td
          key={id}
          id={id}
          className={
            isCurrentDate
              ? "calendar-date current-date"
              : isEventDate
              ? "calendar-date event-date"
              : "calendar-date"
          }
        >
          {i}
        </td>
      );
      if (cells.length === 7) {
        rows.push(<tr key={`row-${i}`}>{cells}</tr>);
        cells = [];
      }
    }
    if (cells.length > 0) {
      rows.push(<tr key={`row-${daysInMonth}`}>{cells}</tr>);
    }
    return rows;
  };

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const monthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  return (
    <div className="calendar-main">
      <div className="calendar-container">
        <table className="calendar">
          <tbody>
            <tr>
              <td>
                <button class="buttons" onClick={handlePrev}>
                  &lt;
                </button>
              </td>
              <td colSpan="5">{renderTitleRow()}</td>
              <td>
                <button class="buttons" onClick={handleNext}>
                  &gt;
                </button>
              </td>
            </tr>
            {renderDayNameRow()}
            {renderDateRows()}
          </tbody>
        </table>
        <div className="green-box-indicator">
          <div className="green-box"></div>
          <p>You have evnts on that day</p>
        </div>
      </div>
      <div className="event-cards-container">
        <div className="events-card">
          <h2>Yesterday's Events</h2>
          <ul>
            {yesterdayEvents.map((event, index) => (
              <a
                href={`/event?eventId=${encodeURIComponent(event.id)}`}
                key={index}
              >
                {event.eventName}
              </a>
            ))}
          </ul>
        </div>
        <div className="events-card">
          <h2>Today's Events</h2>
          <ul className="events-calendar">
            {todayEvents.map((event, index) => (
              <a
                href={`/event?eventId=${encodeURIComponent(event.id)}`}
                key={index}
              >
                {event.eventName}
              </a>
            ))}
          </ul>
        </div>
        <div className="events-card">
          <h2>Tomorrow's Events</h2>
          <ul>
            {tomorrowEvents.map((event, index) => (
              <a
                href={`/event?eventId=${encodeURIComponent(event.id)}`}
                key={index}
              >
                {event.eventName}
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
