import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Explore.css";
import { getHotTracks } from "../service/openwhyd";

// Keep your existing genrePlaylists for the SoundCloud player
const genrePlaylists = {
    "Pop": "https://soundcloud.com/charts/top?genre=pop",
    "Electronic": "https://soundcloud.com/charts/top?genre=electronic",
    "Hip-Hop": "https://soundcloud.com/charts/top?genre=hiphoprap",
    "Rock": "https://soundcloud.com/charts/top?genre=alternativerock",
    "Country": "https://soundcloud.com/charts/top?genre=country",
    "Jazz": "https://soundcloud.com/charts/top?genre=jazzblues"
};

const Explore = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to update the player when a genre is clicked
    const handleGenreClick = (genre) => {
        setSelectedGenre(genrePlaylists[genre]);
        fetchTracks(genre);
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
            setTracks(data);
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
                    <span key={genre} onClick={() => handleGenreClick(genre)}>
                        {genre}
                    </span>
                ))}
            </div>

            {/* SoundCloud Player */}
            {selectedGenre && (
                <div className="player-container">
                    <iframe
                        title="SoundCloud Player"
                        width="100%"
                        height="300"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(selectedGenre)}&color=%23ff5500&auto_play=false&show_artwork=true`}
                    ></iframe>
                </div>
            )}

            {/* Tracks Section */}
            <h2 className="section-title">Top Tracks</h2>
            {loading && <p>Loading tracks...</p>}
            {error && <p className="error-message">{error}</p>}
            
            <div className="tracks-container">
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div key={track.id} className="track-card">
                            <img src={track.img || "https://source.unsplash.com/200x200/?music"} alt={track.name} />
                            <h2 className="track-title">{track.name}</h2>
                            <p className="track-artist">{track.artist}</p>
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>No tracks found</p>
                )}
            </div>

            {/* Event Finder Button */}
            <div className="event-finder-section">
                <h2>Find Music Events Near You</h2>
                <Link to="/events" className="event-button">Find Events</Link>
            </div>
        </div>
    );
};

export default Explore;