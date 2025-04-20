import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Explore.css";
import { getHotTracks, formatTrack } from "../service/openwhyd";


const genrePlaylists = {
    "Pop": "https://soundcloud.com/charts/top?genre=pop",
    "Electronic": "https://soundcloud.com/charts/top?genre=electronic",
    "Hip-Hop": "https://soundcloud.com/charts/top?genre=hiphoprap",
    "Rock": "https://soundcloud.com/charts/top?genre=alternativerock",
    "Country": "https://soundcloud.com/charts/top?genre=country",
    "Jazz": "https://soundcloud.com/charts/top?genre=jazzblues"
};

// Map for API genre params
const genreParams = {
    "Pop": "pop",
    "Electronic": "electronic",
    "Hip-Hop": "hiphop",
    "Rock": "rock",
    "Country": "country",
    "Jazz": "jazz"
};

const Explore = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentGenreName, setCurrentGenreName] = useState("");

    // Function to update the player when a genre is clicked
    const handleGenreClick = (genre) => {
        setSelectedGenre(genrePlaylists[genre]);
        setCurrentGenreName(genre);
        fetchTracks(genreParams[genre] || genre.toLowerCase());
    };

    // Fetch tracks when component mounts
    useEffect(() => {
        fetchTracks();
    }, []);

    // Function to fetch tracks from the API
    const fetchTracks = async (genre = '') => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await getHotTracks(6, genre);
            // Use formatTrack to ensure consistent formatting with Home.js
            const formattedTracks = data.map(formatTrack);
            setTracks(formattedTracks);
        } catch (err) {
            console.error("Failed to fetch tracks:", err);
            setError("Failed to load tracks. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="explore-container">
            <h1 className="page-title">Explore Genres</h1>
            <div className="genres">
                {Object.keys(genrePlaylists).map((genre) => (
                    <span 
                        key={genre} 
                        onClick={() => handleGenreClick(genre)}
                        className={currentGenreName === genre ? "active-genre" : ""}
                    >
                        {genre}
                    </span>
                ))}
            </div>

            {/* Tracks Section */}
            <h2 className="section-title">
                {currentGenreName ? `Top ${currentGenreName} Tracks` : "Top Tracks"}
            </h2>
            {loading && <p>Loading tracks...</p>}
            {error && <p className="error-message">{error}</p>}
            
            <div className="tracks-container">
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div key={track.id} className="track-card">
                            <img src={track.artwork} alt={track.title} />
                            <h2 className="track-title">{track.title}</h2>
                            <p className="track-artist">{track.artist}</p>
                            <a
                                href={`https://soundcloud.com/search?q=${encodeURIComponent(track.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="track-link"
                            >
                                Listen on SoundCloud
                            </a>
                            {/* Link to genre page */}
                            <Link 
                                to={`/genre/${currentGenreName.toLowerCase() || "all"}`} 
                                className="playlist-link"
                            >
                                View All {currentGenreName || "Top"} Tracks
                            </Link>
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>No tracks found</p>
                )}
            </div>

            <h2 className="section-title">
                {currentGenreName ? `Top ${currentGenreName} Tracks` : "Trending on SoundCloud"}
            </h2>
            {loading && <p>Loading tracks...</p>}
            {error && <p className="error-message">{error}</p>}
            
            <div className="tracks-container">
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div key={track.id} className="track-card">
                            <img src={track.artwork} alt={track.title} />
                            <h2 className="track-title">{track.title}</h2>
                            <p className="track-artist">{track.artist}</p>
                            <a
                                href={`https://soundcloud.com/search?q=${encodeURIComponent(track.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="track-link"
                            >
                                Listen on SoundCloud
                            </a>
                            {/* Link to genre page */}
                            <Link 
                                to={`/genre/${currentGenreName.toLowerCase() || "all"}`} 
                                className="playlist-link"
                            >
                                View All {currentGenreName || "Top"} Tracks
                            </Link>
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>No tracks found</p>
                )}
            </div>

            {/* View Full Playlist Button */}
            {tracks.length > 0 && currentGenreName && (
                <div className="view-all-section">
                    <Link 
                        to={`/genre/${currentGenreName.toLowerCase()}`} 
                        className="view-all-button"
                    >
                        View All {currentGenreName} Tracks
                    </Link>
                </div>
            )}

            {/* Event Finder Button */}
            <div className="event-finder-section">
                <h2>Find Music Events Near You</h2>
                <Link to="/events" className="event-button">Find Events</Link>
            </div>
        </div>
    );
};

export default Explore;
