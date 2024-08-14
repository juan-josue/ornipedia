import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SelectDate({ speciesClass, onConfirmation }) {
  const [date, setDate] = useState(new Date());

  const handleConfirmation = () => {
    onConfirmation(date);
  };
  return (
    <div className="flex flex-col gap-[64px] bg-base-100 h-full justify-center items-center">
      <h1 className="uppercase">{`When did you see the ${speciesClass}?`}</h1>
      <div className="join">
        <div className="bg-base-300 flex justify-center items-center rounded-l-full px-[32px]">
          <DatePicker
            selected={date}
            onChange={(selection) => setDate(selection)}
          />
        </div>
        <button
          className="btn btn-primary join-item rounded-r-full"
          onClick={handleConfirmation}
        >
          Confirm Date
        </button>
      </div>
    </div>
  );
}
