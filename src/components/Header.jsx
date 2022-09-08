import dayjs from "dayjs";
import PlusSVG from "../icons/Plus";
import { useState } from "react";
import EventCreator from "./EventCreator";
function Header({ setSelectedDate, selectedDate, setEvent }) {
  const [openEventCreator, setOpenEventCreator] = useState();

  return (
    <header className="header">
      <button
        className="header--addevent"
        onClick={() => setOpenEventCreator(!openEventCreator)}
      >
        <PlusSVG />
      </button>
      <div className="header--date">
        <button
          className="header--date--switcher"
          onClick={() => {
            setSelectedDate(
              selectedDate.set("month", selectedDate.month() - 1)
            );
            localStorage.setItem(
              "DATE",
              JSON.stringify(
                selectedDate.set("month", selectedDate.month() - 1)
              )
            );
          }}
        >
          {"<"}
        </button>
        <input
          className="header--date--picker"
          type="month"
          value={selectedDate.format("YYYY-MM-DD").slice(0, 7)}
          onChange={(e) => setSelectedDate(dayjs(e.target.value))}
        />
        <button
          className="header--date--switcher header--date--switcher__more"
          onClick={() => {
            setSelectedDate(
              selectedDate.set("month", selectedDate.month() + 1)
            );
            localStorage.setItem(
              "DATE",
              JSON.stringify(
                selectedDate.set("month", selectedDate.month() + 1)
              )
            );
          }}
        >
          {">"}
        </button>
      </div>
      {openEventCreator && (
        <EventCreator
          setEvent={setEvent}
          setOpenEventCreator={setOpenEventCreator}
        />
      )}
    </header>
  );
}
export default Header;
