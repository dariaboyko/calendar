import { useState } from "react";
import EventEditor from "./EventEditor";
function Day({date, className,events,setEvents}) {
    const [openEditEvent,setOpenEditEvent] = useState();
    const [event, setEvent] = useState();
  return (
    <div className={className}>
      <p className="content--day__info">
        <span>{date.format("ddd")}</span>
        <span>{date.format("DD")}</span>
      </p>
      {events && (
        <>
          <ul>
            {events
              .filter((e) => e.date === date.format("YYYY-MM-DD"))
              .map((e) => (
                <li>
                  <span
                    onClick={() => {
                      setOpenEditEvent(true);
                      setEvent(e);
                    }}
                  >
                    {e.title}
                  </span>
                </li>
              ))}
          </ul>
          {openEditEvent && (
            <EventEditor
              setOpenEventEditor={setOpenEditEvent}
              eventToEdit={event}
              setEvents={setEvents}
            />
          )}
        </>
      )}
    </div>
  );
}
export default Day;
