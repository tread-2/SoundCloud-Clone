import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getHotTracks, formatTrack } from "../service/openwhyd";
import "./styles/GenrePage.css";

const GenrePage = () => {
    const { genre } = useParams();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format the genre for display
    const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);

    useEffect(() => {
        const fetchGenreTracks = async () => {
            setLoading(true);
            try {
                const genreTracks = await getHotTracks(12, genre);
                const formattedTracks = genreTracks.map(formatTrack);
                setTracks(formattedTracks);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching genre tracks:", err);
                setError("Failed to load tracks for this genre. Please try again later.");
                setLoading(false);
            }
        };

        fetchGenreTracks();
    }, [genre]);

    // SoundCloud playlist URL for this genre
    const soundCloudGenreURL = `https://soundcloud.com/charts/top?genre=${genre.toLowerCase().replace(/-/g, '')}`;

    if (loading) {
        return <div className="loading">Loading {formattedGenre} tracks...</div>;
    }

    return (
        <div className="genre-page">
            <div className="genre-header">
                <h1>{formattedGenre} Playlist</h1>
                <p>Discover the best {formattedGenre} tracks trending right now</p>
            </div>

            <div className="player-container">
                <iframe
                    title="SoundCloud Genre Player"
                    width="100%"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundCloudGenreURL)}&color=%23ff5500&auto_play=false&show_artwork=true`}
                ></iframe>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="genre-tracks-container">
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div key={track.id} className="genre-track-card">
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
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>No tracks found for {formattedGenre}</p>
                )}
            </div>

            <div className="back-to-explore">
                <Link to="/explore" className="back-button">Back to Explore</Link>
            </div>
        </div>
    );
};

export default GenrePage;
