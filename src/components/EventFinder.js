import React, { useState, useEffect } from "react";
import { getEvents, formatEvent } from "../service/eventbrite"; // Adjust the path accordingly
import "./styles/EventFinder.css";

const EventFinder = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents('San Francisco', 6);
        setEvents(data.events ? data.events.map(formatEvent) : []);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="event-finder-container">
      <h1 className="page-title">Find Events Near You</h1>
      <p className="info-text">This feature will use an API to display local events based on your location.</p>
      <div className="event-list">
        {events && events.length === 0 ? (
          <div>No events found near you at the moment.</div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-item">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date">{event.date}</p>
              <p className="event-location">{event.location}</p>
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-link">
                View Event
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventFinder;
