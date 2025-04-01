import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Explore.css";

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

    // Function to update the player when a genre is clicked
    const handleGenreClick = (genre) => {
        setSelectedGenre(genrePlaylists[genre]);
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

            {/* Event Finder Button */}
            <div className="event-finder-section">
                <h2>Find Music Events Near You</h2>
                <Link to="/events" className="event-button">Find Events</Link>
            </div>
        </div>
    );
};

export default Explore;
