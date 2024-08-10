import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SelectDate({ onConfirmation }) {
  const [date, setDate] = useState(new Date());

  const handleConfirmation = () => {
    onConfirmation(date);
  };
  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(selection) => setDate(selection)}
      />
      <button
        onClick={() => {
          handleConfirmation();
        }}
      >
        Confirm Date
      </button>
    </div>
  );
}
