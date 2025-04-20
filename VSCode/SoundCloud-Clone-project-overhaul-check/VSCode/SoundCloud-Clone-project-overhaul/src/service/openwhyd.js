const BASE_URL = 'http://localhost:3001/api/proxy/openwhyd';

export const getHotTracks = async (limit = 6, genre = '') => {
  try {
    const params = new URLSearchParams();
    params.append('format', 'json');
    if (limit) params.append('limit', limit);
    if (genre) params.append('genre', genre);
    
    console.log(`Fetching hot tracks: ${BASE_URL}/hot?${params}`);
    const response = await fetch(`${BASE_URL}/hot?${params}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching hot tracks:', error);
    // Return fallback data if API fails
    return getMockHotTracks(limit, genre);
  }
};

export const getLatestTracks = async (limit = 6) => {
  try {
    const params = new URLSearchParams();
    params.append('format', 'json');
    if (limit) params.append('limit', limit);
    
    console.log(`Fetching latest tracks: ${BASE_URL}/tracks?${params}`);
    const response = await fetch(`${BASE_URL}/tracks?${params}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest tracks:', error);
    // Return fallback data if API fails
    return getMockLatestTracks(limit);
  }
};

// Mock data in case the API is unavailable
const getMockHotTracks = (limit = 6, genre = '') => {
  const tracks = [
    {
      id: '1',
      name: 'Summer Vibes',
      artist: 'DJ Chill',
      img: 'https://source.unsplash.com/200x200/?summer,music',
      genre: 'electronic'
    },
    {
      id: '2',
      name: 'City Lights',
      artist: 'Urban Beats',
      img: 'https://source.unsplash.com/200x200/?city,night',
      genre: 'electronic'
    },
    {
      id: '3',
      name: 'Pop Sensation',
      artist: 'Pop Star',
      img: 'https://source.unsplash.com/200x200/?pop,music',
      genre: 'pop'
    },
    {
      id: '4',
      name: 'Rock Anthem',
      artist: 'The Rockers',
      img: 'https://source.unsplash.com/200x200/?rock,concert',
      genre: 'rock'
    },
    {
      id: '5',
      name: 'Hip Hop Flow',
      artist: 'MC Flow',
      img: 'https://source.unsplash.com/200x200/?hiphop,urban',
      genre: 'hiphop'
    },
    {
      id: '6',
      name: 'Country Roads',
      artist: 'Country Band',
      img: 'https://source.unsplash.com/200x200/?country,guitar',
      genre: 'country'
    }
  ];
  
  if (genre) {
    return tracks
      .filter(track => track.genre === genre.toLowerCase())
      .slice(0, limit);
  }
  
  return tracks.slice(0, limit);
};

const getMockLatestTracks = (limit = 6) => {
  return [
    {
      id: '7',
      name: 'New Release 2025',
      artist: 'Future Sound',
      img: 'https://source.unsplash.com/200x200/?futuristic,music'
    },
    {
      id: '8',
      name: 'Fresh Beat',
      artist: 'New Producer',
      img: 'https://source.unsplash.com/200x200/?studio,producer'
    },
    {
      id: '9',
      name: 'Just Dropped',
      artist: 'Rising Star',
      img: 'https://source.unsplash.com/200x200/?star,music'
    },
    {
      id: '10',
      name: 'This Week\'s Hit',
      artist: 'Trending Artist',
      img: 'https://source.unsplash.com/200x200/?trending,artist'
    },
    {
      id: '11',
      name: 'Hot Off The Press',
      artist: 'Studio Masters',
      img: 'https://source.unsplash.com/200x200/?recording,studio'
    },
    {
      id: '12',
      name: 'Breaking Through',
      artist: 'Newcomer',
      img: 'https://source.unsplash.com/200x200/?breakthrough,music'
    }
  ].slice(0, limit);
};

// This basically formats the track object to include a random image from the pexelsImages array
const pexelsImages = [
  "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&h=200&w=200"
];

const formatTrack = (track) => {
  const randomImage = pexelsImages[Math.floor(Math.random() * pexelsImages.length)];
  return {
    id: track.id || track._id || Math.random().toString(),
    title: track.name || track.title || "Untitled",
    artist: track.artist || "Unknown Artist",
    artwork: randomImage
  };
};
export { formatTrack };


export const searchTracks = async (query) => {
  try {
    const params = new URLSearchParams();
    params.append('format', 'json');
    params.append('q', query);

    console.log(`Searching tracks: ${BASE_URL}/search?${params}`);
    const response = await fetch(`${BASE_URL}/search?${params}`);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching tracks:', error);
    return []; // Return empty array as fallback
  }
};

