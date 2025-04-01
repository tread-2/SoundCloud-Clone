import { useState } from "react";
import "./styles/Home.css"; 

const mockTracks = [
    {
        id: 1,
        title: "Lo-Fi Chill Beats",
        artist: "DJ Chill",
        artwork: "https://source.unsplash.com/200x200/?music,headphones",
    },
    {
        id: 2,
        title: "Deep House Vibes",
        artist: "HouseMaster",
        artwork: "https://source.unsplash.com/200x200/?dj,party",
    },
    {
        id: 3,
        title: "Synthwave Dreams",
        artist: "RetroWave",
        artwork: "https://source.unsplash.com/200x200/?neon,city",
    },
];

const mockPopularPlaylists = [
    {
        id: 1,
        title: "Top 100 Hits",
        artwork: "https://source.unsplash.com/200x200/?pop,music",
    },
    {
        id: 2,
        title: "EDM Festival",
        artwork: "https://source.unsplash.com/200x200/?festival,edm",
    },
    {
        id: 3,
        title: "Hip Hop Essentials",
        artwork: "https://source.unsplash.com/200x200/?hiphop,rapper",
    },
];

const mockUpcomingPlaylists = [
    {
        id: 1,
        title: "New Indie Finds",
        artwork: "https://source.unsplash.com/200x200/?indie,music",
    },
    {
        id: 2,
        title: "Fresh Electronic",
        artwork: "https://source.unsplash.com/200x200/?electronic,beats",
    },
    {
        id: 3,
        title: "Next Big Thing",
        artwork: "https://source.unsplash.com/200x200/?new,album",
    },
];

const Home = () => {
    const [tracks] = useState(mockTracks);
    const [popularPlaylists] = useState(mockPopularPlaylists);
    const [upcomingPlaylists] = useState(mockUpcomingPlaylists);

    return (
        <div className="home-container">
            <h1 className="page-title">Trending Tracks</h1>
            <div className="tracks-container">
                {tracks.map((track) => (
                    <div key={track.id} className="track-card">
                        <img src={track.artwork} alt={track.title} />
                        <h2 className="track-title">{track.title}</h2>
                        <p className="track-artist">{track.artist}</p>
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
                    </div>
                ))}
            </div>

            {/* Upcoming Playlists Section */}
            <h1 className="page-title">Upcoming Playlists</h1>
            <div className="playlists-container">
                {upcomingPlaylists.map((playlist) => (
                    <div key={playlist.id} className="playlist-card">
                        <img src={playlist.artwork} alt={playlist.title} />
                        <h2 className="playlist-title">{playlist.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;