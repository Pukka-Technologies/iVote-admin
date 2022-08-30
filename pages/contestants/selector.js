import React from "react";

import Select from "react-select";
const groupedData = [
  { value: "eventsone", label: "Events" },
  { value: "eventstwo", label: "Events" },
  { value: "eventsthree", label: "Events" },
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
  />
);

export default Selector
