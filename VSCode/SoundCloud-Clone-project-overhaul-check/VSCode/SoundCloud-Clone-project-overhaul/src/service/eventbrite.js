const BASE_URL = 'http://localhost:3001/api/proxy/eventbrite';

// Function to fetch events from Eventbrite API
export const getEvents = async (location = 'San Francisco', limit = 6) => {
  try {
    const params = new URLSearchParams();
    params.append('location.address', location);
    params.append('limit', limit);

    console.log(`Fetching events: ${BASE_URL}/events/search?${params}`);
    const response = await fetch(`${BASE_URL}/events/search?${params}`);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return getMockEvents(limit); // Fallback to mock data
  }
};

// Mock data for events when the API is unavailable
const getMockEvents = (limit = 6) => {
  return [
    {
      id: '1',
      name: { text: 'Music Festival 2025' },
      start: { local: '2025-06-15T18:00:00' },
      location: { address: 'Golden Gate Park, San Francisco' },
      url: 'https://www.eventbrite.com/e/music-festival-2025-tickets-1234567890',
    },
    {
      id: '2',
      name: { text: 'Tech Conference 2025' },
      start: { local: '2025-07-01T09:00:00' },
      location: { address: 'Moscone Center, San Francisco' },
      url: 'https://www.eventbrite.com/e/tech-conference-2025-tickets-0987654321',
    },
    {
      id: '3',
      name: { text: 'Food Truck Expo' },
      start: { local: '2025-05-21T10:00:00' },
      location: { address: 'Ferry Building, San Francisco' },
      url: 'https://www.eventbrite.com/e/food-truck-expo-tickets-1122334455',
    },
    {
      id: '4',
      name: { text: 'Fashion Show 2025' },
      start: { local: '2025-08-10T19:00:00' },
      location: { address: 'Pier 39, San Francisco' },
      url: 'https://www.eventbrite.com/e/fashion-show-2025-tickets-6677889900',
    },
    {
      id: '5',
      name: { text: 'Startup Meetup' },
      start: { local: '2025-09-14T16:00:00' },
      location: { address: 'The Vault, San Francisco' },
      url: 'https://www.eventbrite.com/e/startup-meetup-tickets-2233445566',
    },
    {
      id: '6',
      name: { text: 'Outdoor Movie Night' },
      start: { local: '2025-06-20T20:00:00' },
      location: { address: 'Dolores Park, San Francisco' },
      url: 'https://www.eventbrite.com/e/outdoor-movie-night-tickets-5566778899',
    }
  ].slice(0, limit);
};

// Format event data for easier use in your app (similar to how tracks are formatted)
export const formatEvent = (event) => {
  return {
    id: event.id,
    title: event.name.text,
    date: new Date(event.start.local).toLocaleString(),
    location: event.location.address || 'Location not available',
    link: event.url,
  };
};
