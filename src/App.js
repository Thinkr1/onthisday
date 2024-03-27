import React, { useState } from "react";
import axios from "axios";
import "./onthisday.css"

const OnThisDay = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [events, setEvents] = useState([]);

  const handleSubmit = async () => {
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
    const headers = {
      Authorization: `${process.env.REACT_APP_ACCESS_TOKEN}`,
    };

    try {
      const response = await axios.get(url, { headers });
      setEvents(response.data.events);
    } catch (err) {
      console.error(err);
      setEvents(["Error: " + err.message]);
    }
  };

  return (
    <div>
      <input
        value={day}
        onChange={(e) => setDay(e.target.value)}
        type="number"
        placeholder="Day"
      />
      <input
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        type="number"
        placeholder="Month"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div id="events">
        <table className="event-table">
          <thead>
            <tr>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnThisDay;
