import React, { useState } from "react";
import axios from "axios";
import "./onthisday.css";

const OnThisDay = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [events, setEvents] = useState([]);
  const [dayErr, setDayErr] = useState(false);
  const [monthErr, setMonthErr] = useState(false);

  const monthToNumber = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const handleSubmit = async () => {
    if (dayErr || monthErr) {
      setMonthErr(true);
      return;
    } else {
      setMonth(monthToNumber[month.toString()]);
      setMonthErr(false);
      // console.log("Month:", month, "Day:", day);
      const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
      const headers = {
        Authorization: `${process.env.ACCESS_TOKEN}`,
      };

      try {
        const response = await axios.get(url, { headers });
        setEvents(response.data.events);
      } catch (err) {
        console.error(err);
        setEvents(["Error: " + err.message]);
      }
    }
  };

  return (
    <div>
      <h1>
        <a
          href="https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day"
          target="_blank"
          rel="noopener noreferrer"
        >
          On This Day
        </a>{" "}
        Wikipedia API
      </h1>
      <div className="form-container">
        <input
          value={day || ""}
          onChange={(e) => setDay(e.target.value)}
          onBlur={() => {
            if (day < 1 || day > 31) {
              setDay("")
              setDayErr(true);
            } else {
              setDayErr(false);
            }
          }}
          style={{
            border: dayErr ? "2px solid red" : "1px solid #ccc",
            animation: dayErr ? "shake 0.5s" : "none",
          }}
          list="daylist"
          type="number"
          placeholder="Day"
          max="31"
          min="1"
        />

        <datalist id="daylist">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ].map((day) => (
            <option key={day} value={day}></option>
          ))}
        </datalist>

        <input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onBlur={() => {
            if (month < 1 || month > 12) {
              // setMonth("")
              setMonthErr(true);
            } else {
              setMonthErr(false);
            }
          }}
          style={{
            border: monthErr ? "2px solid red" : "1px solid #ccc",
            animation: monthErr ? "shake 0.5s" : "none",
          }}
          list="monthlist"
          type="text"
          placeholder="Month"
          max="12"
          min="1"
        />

        <datalist id="monthlist">
          {[...Object.keys(monthToNumber)].map((monthNumber) => (
            <option value={monthToNumber[monthNumber]} key={monthToNumber[monthNumber]}>
              {monthNumber}
            </option>
          ))}
        </datalist>
        <button onClick={handleSubmit}>Submit</button>
      </div>
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
