// src/components/Home.js
import { useState, useEffect } from "react";
import "./styles/Home.css"; 
import { getHotTracks, getLatestTracks, formatTrack } from "../service/openwhyd";

const Home = () => {
    const [trendingTracks, setTrendingTracks] = useState([]);
    const [popularPlaylists, setPopularPlaylists] = useState([]);
    const [upcomingTracks, setUpcomingTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const hotTracks = await getHotTracks(6);
                const formattedHotTracks = hotTracks.map(formatTrack);
                setTrendingTracks(formattedHotTracks);

                const latestTracks = await getLatestTracks(6);
                const formattedLatestTracks = latestTracks.map(formatTrack);
                setUpcomingTracks(formattedLatestTracks);

                const electronicTracks = await getHotTracks(6, 'electronic');
                const formattedElectronicTracks = electronicTracks.map(formatTrack);
                setPopularPlaylists(formattedElectronicTracks);

                setLoading(false);
            } catch (err) {
                console.error("Error getting data:", err);
                setError("Failed to load music content. Please try again later.");
                setLoading(false);
            }
        };

        getData();
    }, []);

    const fallbackTracks = [
        { id: 1, title: "Lo-Fi Chill Beats", artist: "DJ Chill", artwork: "https://source.unsplash.com/200x200/?music,headphones" },
        { id: 2, title: "Deep House Vibes", artist: "HouseMaster", artwork: "https://source.unsplash.com/200x200/?dj,party" },
        { id: 3, title: "Synthwave Dreams", artist: "RetroWave", artwork: "https://source.unsplash.com/200x200/?neon,city" },
    ];

    if (loading) {
        return <div className="loading">Loading amazing music content...</div>;
    }

    if (error) {
        console.log("Using fallback data due to API error");
        if (trendingTracks.length === 0) setTrendingTracks(fallbackTracks);
        if (popularPlaylists.length === 0) setPopularPlaylists(fallbackTracks);
        if (upcomingTracks.length === 0) setUpcomingTracks(fallbackTracks);
    }

    return (
        <div className="home-container">
            <h1 className="page-title">Trending Tracks</h1>
            <div className="tracks-container">
                {trendingTracks.map((track) => (
                    <div key={track.id} className="track-card">
                        <img src={track.artwork} alt={track.title} />
                        <h2 className="track-title">{track.title}</h2>
                        <p className="track-artist">{track.artist}</p>
                        {/* Add the link for SoundCloud */}
                        <a
                            href={`https://soundcloud.com/search?q=${encodeURIComponent(track.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="track-link"
                        >
                            Listen on SoundCloud
                        </a>
                    </div>
                ))}
            </div>

            {/* Popular Playlists Section */}
            <h1 className="page-title">Popular Playlists</h1>
            <div className="playlists-container">
                {popularPlaylists.map((playlist) => (
                    <div key={playlist.id} className="playlist-card">
                        <img src={playlist.artwork} alt={playlist.title} />
                        <h2 className="playlist-title">{playlist.title}</h2>
                        <a
                            href={`https://soundcloud.com/search/sets?q=${encodeURIComponent(playlist.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="playlist-link"
                        >
                            View Playlist on SoundCloud
                        </a>
                    </div>
                ))}
            </div>

            {/* Upcoming Tracks Section */}
            <h1 className="page-title">Latest Uploads</h1>
            <div className="playlists-container">
                {upcomingTracks.map((track) => (
                    <div key={track.id} className="playlist-card">
                        <img src={track.artwork} alt={track.title} />
                        <h2 className="playlist-title">{track.title}</h2>
                        {/* Add the link for SoundCloud */}
                        <a
                            href={`https://soundcloud.com/search?q=${encodeURIComponent(track.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="track-link"
                        >
                            Listen on SoundCloud
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
