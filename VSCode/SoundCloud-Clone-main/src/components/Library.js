import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Explore.css";
import { searchTracks, formatTrack } from "../service/openwhyd";

const genreKeywords = {
    "Pop": "pop",
    "Electronic": "electronic edm",
    "Hip-Hop": "hiphop rap",
    "Rock": "rock",
    "Country": "country",
    "Jazz": "jazz"
};

const Explore = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedGenre) {
            loadGenreTracks(selectedGenre);
        }
    }, [selectedGenre]);

    const loadGenreTracks = async (genre) => {
        try {
            setLoading(true);
            const searchQuery = genreKeywords[genre];
            const results = await searchTracks(searchQuery, 10);
            setTracks(results.map(formatTrack));
        } catch (error) {
            console.error("Error loading genre tracks:", error);
            setTracks([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to update the selected genre when a genre is clicked
    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div className="explore-container">
            <h1 className="page-title">Explore Genres</h1>
            <div className="genres">
                {Object.keys(genreKeywords).map((genre) => (
                    <span 
                        key={genre} 
                        onClick={() => handleGenreClick(genre)}
                        className={selectedGenre === genre ? "active" : ""}
                    >
                        {genre}
                    </span>
                ))}
            </div>

            {/* Tracks Display */}
            {loading ? (
                <div className="loading">Loading tracks...</div>
            ) : selectedGenre && (
                <div className="tracks-section">
                    <h2>{selectedGenre} Tracks</h2>
                    <div className="tracks-container">
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <div key={track.id} className="track-card">
                                    <img src={track.artwork} alt={track.title} />
                                    <h3 className="track-title">{track.title}</h3>
                                    <p className="track-artist">{track.artist}</p>
                                    {track.url && (
                                        <a 
                                            href={track.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="listen-button"
                                        >
                                            Listen
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No tracks found for this genre</p>
                        )}
                    </div>
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