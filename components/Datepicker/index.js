import { useState } from "react";
import DatePicker from "react-datepicker";
export const RangeDatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400   w-full"
        isClearable
        placeholderText="Select Opening Date"
        popperPlacement="top-start"
        // showTimeSelect
        // timeFormat="HH:mm"
        // timeIntervals={15}
        // timeCaption="time"
        // dateFormat="MMMM d, yyyy h:mm aa"
        // withPortal
      >
        <div className="text-green-400 py-2 px-3">Select vote opening date</div>
      </DatePicker>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        isClearable
        className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400 w-full"
        placeholderText="Select Closing Date"
        popperPlacement="top-end"
        // peekNextMonth
        // showMonthDropdown
        // showYearDropdown
        // dropdownMode="select"
      >
        <div className="text-green-400 py-2 px-3">Select vote closing date</div>
      </DatePicker>
    </>
  );
};

export const SingleDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={startDate}
        className="bg-white px-2 py-3 focus:border-none  focus:outline-green-400   w-full"
        isClearable
        placeholderText="Select Date"
      />
    </>
  );
};
