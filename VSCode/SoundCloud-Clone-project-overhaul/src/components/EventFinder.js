import React, { useState, useEffect } from "react";
import "./styles/EventFinder.css";

const EventFinder = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchCity, setSearchCity] = useState("San Francisco");
  const [searchArtist, setSearchArtist] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const apiKey = "ZxIcUvZTX1eCrsjL69K1aQLthexeXu7K"; // Ticketmaster API key

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      apikey: apiKey,
      classificationName: "music",
    });

    if (searchCity.trim()) params.append("city", searchCity.trim());
    if (searchArtist.trim()) params.append("keyword", searchArtist.trim());
    if (searchDate.trim()) params.append("startDateTime", `${searchDate}T00:00:00Z`);

    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`
      );
      const data = await response.json();
      const eventList = data._embedded?.events || [];

      const formatted = eventList.map((event) => ({
        id: event.id,
        title: event.name,
        date: event.dates.start.localDate,
        location: `${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state?.name || ''}`,
        link: event.url,
      }));

      setEvents(formatted);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="event-finder-container">
      <h1 className="page-title">Find Events Near You</h1>
      <p className="info-text">Search for music events by city, artist, or date using the Ticketmaster API.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter artist name..."
          value={searchArtist}
          onChange={(e) => setSearchArtist(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={fetchEvents}>Search</button>
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div>{error}</div>
      ) : events.length === 0 ? (
        <div>No events found with your criteria.</div>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date">{event.date}</p>
              <p className="event-location">{event.location}</p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="event-link"
              >
                View Event
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventFinder;
