import React, { useEffect, useState } from "react";

import Select from "react-select";
import { addContestant } from "../../utils";
import { useStateValue } from "../../context/StateProvider";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#000",
  borderRadius: "2em",
  color: "#f00",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "#86efac",
    backgroundColor: state.isSelected ? "#86efac" : "white",
    cursor: "pointer",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    color: "#86efac",
    cursor: "pointer",
    outline: state.isFocused ? "2px solid #86efac" : "none",
    border: "none",
    padding: "0.3rem 0.3rem",
  }),
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const EventSelector = ({ setCategory, category }) => {

  const [{events}, dispatch] = useStateValue()

  const handleChange = (e) => {
    console.log(e);
    setCategory(e.value);
  }

  // change options to select options
  const selectOptions = events && events.map((option) => {
    return {
      value: option._id,
      label: option.name,
    };
  }) || []

  const defaultValue = selectOptions.find((option) => option.value == category)
  
  return (
    <Select
      defaultValue={defaultValue}
      options={selectOptions}
      formatGroupLabel={formatGroupLabel}
      styles={customStyles}
      onChange={(e)=> handleChange(e)}
      placeholder="Select Event"
      id="selectbox"
      instanceId="selectbox"
    />
  );
};

export const EventTypeSelector = ({  onChange }) => {

  const selectOptions = [
    { value: "all", label: "All Events" },
    { value: "ongoing", label: "Ongoing Events" },
    { value: "upcoming", label: "Upcoming Events" },
    { value: "closed", label: "Closed Events" },
  ];

  return (
    <Select
      // defaultValue={type}
      options={selectOptions}
      styles={customStyles}
      onChange={(e) => onChange(e.value)}
      placeholder="Select Event Type"
      id="selectbox"
      instanceId="selectbox"
    />
  );
};

export default EventSelector;
