import { useState } from "react";
import { Alert } from "@mui/material";
import CloseSVG from "../icons/Close";
function EventEditor({ setOpenEventEditor, eventToEdit, setEvents }) {
  const [eventTime, setEventTime] = useState(eventToEdit.date);
  const [eventTitle, setEventTitle] = useState(eventToEdit.title);
  const [warning, setWarning] = useState("");
  const [eventDescription, setEventDescription] = useState(
    eventToEdit.description
  );
  let items = JSON.parse(localStorage.getItem("EVENTS"));
  function handleSubmit(e) {
    e.preventDefault();
    if (eventTitle.trim().length === 0) {
      setWarning(true);
    } else {
      setWarning(false);
      items = items.map((e) => {
        if (e.id === eventToEdit.id)
          return {
            id: eventToEdit.id,
            title: eventTitle,
            description: eventDescription,
            date: eventTime,
          };
        else return e;
      });
      setEvents(items);
      localStorage.setItem("EVENTS", JSON.stringify(items ? items : []));
      setOpenEventEditor(false);
    }
  }
  return (
    <>
      <form className="creator" onSubmit={(e) => handleSubmit(e)}>
        <button
          className="button__close"
          onClick={() => setOpenEventEditor(false)}
        >
          <CloseSVG />
        </button>
        <h2>Add event</h2>
        <input
          placeholder="Title changes here"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          placeholder="Description changes here"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <input
          type="date"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <button className="button__submit">Save</button>
        {warning && <Alert severity="warning">Please name your event</Alert>}
      </form>
      <div
        className="creator__wrapper"
        onClick={() => setOpenEventEditor(false)}
      ></div>
    </>
  );
}
export default EventEditor;
