import { useState } from "react";
import "./styles/Library.css"; 

const Library = () => {
    // Mock data for each section
    const recentlyPlayed = [
        { id: 1, title: "Chill Vibes", artist: "DJ Chill", artwork: "https://source.unsplash.com/200x200/?music,chill", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { id: 2, title: "Lo-Fi Beats", artist: "LoFi Master", artwork: "https://source.unsplash.com/200x200/?lofi,beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    ];

    const likedTracks = [
        { id: 3, title: "Rock Anthem", artist: "The Rockers", artwork: "https://source.unsplash.com/200x200/?rock,music", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
        { id: 4, title: "Electronic Journey", artist: "EDM King", artwork: "https://source.unsplash.com/200x200/?edm,dj", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    ];

    const userPlaylists = [
        { id: 5, name: "My Chill Mix", image: "https://source.unsplash.com/200x200/?playlist,chill" },
        { id: 6, name: "Workout Tracks", image: "https://source.unsplash.com/200x200/?workout,music" },
    ];

    // 🔹 Download function
    const handleDownload = (url, filename) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename; // Suggests a filename
        link.target = "_blank"; // Opens in a new tab if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="library-container">
            <h1 className="page-title">Your Library</h1>

            {/* Recently Played Section */}
            <section>
                <h2>Recently Played</h2>
                <div className="track-list">
                    {recentlyPlayed.map(track => (
                        <div key={track.id} className="track-card">
                            <img src={track.artwork} alt={track.title} />
                            <h3>{track.title}</h3>
                            <p>{track.artist}</p>
                            {/* ⬇ Download Button */}
                            <button className="download-btn" onClick={() => handleDownload(track.url, `${track.title}.mp3`)}>
                                ⬇ Download
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Liked Tracks Section */}
            <section>
                <h2>Liked Tracks</h2>
                <div className="track-list">
                    {likedTracks.map(track => (
                        <div key={track.id} className="track-card">
                            <img src={track.artwork} alt={track.title} />
                            <h3>{track.title}</h3>
                            <p>{track.artist}</p>
                            {/* ⬇ Download Button */}
                            <button className="download-btn" onClick={() => handleDownload(track.url, `${track.title}.mp3`)}>
                                ⬇ Download
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Playlists Section */}
            <section>
                <h2>Your Playlists</h2>
                <div className="track-list">
                    {userPlaylists.map(playlist => (
                        <div key={playlist.id} className="playlist-card">
                            <img src={playlist.image} alt={playlist.name} />
                            <h3>{playlist.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Library;

