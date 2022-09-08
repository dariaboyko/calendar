import Day from "./Day";
import { getMonthData } from "./GetData";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Header from "./Header";
function CalendarContent() {
  const [event, setEvent] = useState();
  const [eventArray, setEventArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  useEffect(() => {
    if (localStorage.getItem("DATE")) {
      if (
        dayjs().format("YYYY-MM-DD") !==
        JSON.parse(localStorage.getItem("DATE")).slice(0, 10)
      ) {
        setSelectedDate(dayjs(JSON.parse(localStorage.getItem("DATE"))));
      }
    } else {
      localStorage.setItem("DATE", JSON.stringify(dayjs()));
    }
  }, []);
  const year = selectedDate.year();
  const month = selectedDate.month() + 1;
  let numberOfFirstDay = Number(getMonthData(year, month)[0].format("d")) - 1;
  let previousMonth = getMonthData(year, month - 1).slice(
    getMonthData(year, month - 1).length - numberOfFirstDay,
    getMonthData(year, month - 1).length
  );
  let EVENTS = [];
  if (localStorage.getItem("EVENTS")) {
    EVENTS = JSON.parse(localStorage.getItem("EVENTS"));
  } else {
    localStorage.setItem("EVENTS", JSON.stringify([]));
  }
  if (event) {
    if (
      JSON.parse(localStorage.getItem("EVENTS")).filter(
        ({ id }) => id === event.id
      ).length === 0
    ) {
      EVENTS.push(event);
      setEventArray(EVENTS);
      localStorage.setItem("EVENTS", JSON.stringify(eventArray));
    }
  }

  return (
    <>
      <Header
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setEvent={setEvent}
      />
      <main className="content">
        {previousMonth.map((date) => (
          <Day date={date} className="content--day__previous content--day" />
        ))}
        {getMonthData(year, month).map((date) => (
          <Day
            events={EVENTS}
            date={date}
            className={
              date.diff(dayjs().format("YYYY-M-D"), "day") === 0
                ? "content--day__current content--day"
                : "content--day"
            }
            setEvents={setEventArray}
          />
        ))}
      </main>
    </>
  );
}
export default CalendarContent;
