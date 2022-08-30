import React from "react";

import Select from "react-select";
const groupedData = [
  { value: "eventsone", label: "Events 1" },
  { value: "eventstwo", label: "Events 2" },
  { value: "eventsthree", label: "Events 3" },
  { value: "eventsfour", label: "Events 4" },

];
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
    // border: "2px solid #86efac",
    border: state.isFocused ? "2px solid #86efac" : "none",
    border: state.isHovered ? "2px solid #86efac" : "none",


  })
}

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const Selector = () => (
  <Select
    defaultValue={groupedData[0]}
    options={groupedData}
    formatGroupLabel={formatGroupLabel}
    styles={customStyles}
  />
);

export default Selector
