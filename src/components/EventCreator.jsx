import { useState } from "react";
import { Alert } from "@mui/material";
import dayjs from "dayjs";
import CloseSVG from "../icons/Close";
function EventCreator({ setOpenEventCreator, setEvent }) {
  const [eventTime, setEventTime] = useState(dayjs().format("YYYY-MM-DD"));
  const [eventTitle, setEventTitle] = useState("");
  const [warning, setWarning] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (eventTitle.trim().length === 0) {
      setWarning(true);
    } else {
      setWarning(false);
      setEvent({
        id: Math.random(),
        title: eventTitle,
        description: eventDescription,
        date: eventTime,
      });
      setOpenEventCreator(false);
    }
  }
  return (
    <>
      <form className="creator" onSubmit={(e) => handleSubmit(e)}>
        <button
          className="button__close"
          onClick={() => setOpenEventCreator(false)}
        >
          <CloseSVG />
        </button>
        <h2>Add event</h2>
        <input
          placeholder="Title goes here"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          placeholder="Description goes here"
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
        onClick={() => setOpenEventCreator(false)}
      ></div>
    </>
  );
}
export default EventCreator;
