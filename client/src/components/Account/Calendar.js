import React, { useState } from 'react';
import './Calendar.css';

function Home() {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const renderTitleRow = () => (
    <tr>
      <td colSpan="7" className="calendar-title">{`${monthName(month)} ${year}`}</td>
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
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const id = `${year}-${month + 1}-${i}`;
      cells.push(<td key={id} id={id} className={i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear() ? "calendar-date current-date" : "calendar-date"}>{i}</td>);
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
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  return (
    <table className="calendar">
      <tbody>
        <tr>
          <td><button onClick={handlePrev}>&lt;</button></td>
          <td colSpan="5">{renderTitleRow()}</td>
          <td><button onClick={handleNext}>&gt;</button></td>
        </tr>
        {renderDayNameRow()}
        {renderDateRows()}
      </tbody>
    </table>
  );
}

export default Home;
