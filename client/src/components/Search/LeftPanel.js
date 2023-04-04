import React from "react";

function LeftPanel() {
  const sortOptions = [
    { label: "Sort by Name", value: "name" },
    { label: "Sort by Date", value: "date" },
    { label: "Sort by Rating", value: "rating" },
  ];

  const filters = [
    { label: "Filter 1", value: "filter1" },
    { label: "Filter 2", value: "filter2" },
    { label: "Filter 3", value: "filter3" },
    { label: "Filter 4", value: "filter4" },
    { label: "Filter 5", value: "filter5" },
    { label: "Filter 6", value: "filter6" },
    { label: "Filter 7", value: "filter7" },
    { label: "Filter 8", value: "filter8" },
    { label: "Filter 9", value: "filter9" },
    { label: "Filter 10", value: "filter10" },
  ];

  return (
    <div className="left-panel">
      <h3>Sort by:</h3>
      <select>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <h3>Filters:</h3>
      {filters.map((filter) => (
        <div key={filter.value}>
          <input type="checkbox" value={filter.value} />
          <label>{filter.label}</label>
        </div>
      ))}
    </div>
  );
}

export default LeftPanel;
