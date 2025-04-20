import React, { useState, useEffect } from "react";
import "./styles/EventFinder.css";

const EventFinder = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("San Francisco"); // Default city
  const [searchCity, setSearchCity] = useState("San Francisco"); // Controlled input
  const [searchArtist, setSearchArtist] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const apiKey = "ZxIcUvZTX1eCrsjL69K1aQLthexeXu7K"; // Ticketmaster API key

  const fetchEvents = async (cityName, artist = "", date = "") => {
    setLoading(true);
    setError(null);
    try {
      let query = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${cityName}`;
  
      if (artist.trim()) {
        query += `&keyword=${encodeURIComponent(artist.trim())}`;
      }
  
      if (date.trim()) {
        query += `&startDateTime=${date.trim()}T00:00:00Z`;
      }
  
      query += `&apikey=${apiKey}`;
  
      const response = await fetch(query);
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

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      fetchEvents(searchCity.trim(), searchArtist, searchDate);
    }
  };
  

  return (
    <div className="event-finder-container">
      <h1 className="page-title">Find Events Near You</h1>
      <p className="info-text">Search for music events in your city using the Ticketmaster API.</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter artist..."
          value={searchArtist}
          onChange={(e) => setSearchArtist(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div>{error}</div>
      ) : events.length === 0 ? (
        <div>No events found in {city}.</div>
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
