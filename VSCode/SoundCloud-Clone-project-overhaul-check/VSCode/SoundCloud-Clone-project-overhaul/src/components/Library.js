import { useState } from "react";
import "./styles/Library.css";

const Library = () => {
  // Initial track data
  const allTracks = [
    { id: 1, title: "Chill Vibes", artist: "DJ Chill", artwork: "https://source.unsplash.com/200x200/?music,chill", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Lo-Fi Beats", artist: "LoFi Master", artwork: "https://source.unsplash.com/200x200/?lofi,beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Rock Anthem", artist: "The Rockers", artwork: "https://source.unsplash.com/200x200/?rock,music", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, title: "Electronic Journey", artist: "EDM King", artwork: "https://source.unsplash.com/200x200/?edm,dj", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 5, title: "Summer Beats", artist: "DJ Sun", artwork: "https://source.unsplash.com/200x200/?summer,beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  ];

  const [likedTrackIds, setLikedTrackIds] = useState([]);
  const [downloadedTrackIds, setDownloadedTrackIds] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "liked", "downloaded"

  const toggleLike = (id) => {
    setLikedTrackIds(prev =>
      prev.includes(id) ? prev.filter(trackId => trackId !== id) : [...prev, id]
    );
  };

  const handleDownload = (track) => {
    if (!downloadedTrackIds.includes(track.id)) {
      const link = document.createElement("a");
      link.href = track.url;
      link.download = `${track.title}.mp3`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedTrackIds(prev => [...prev, track.id]);
    }
  };

  const getFilteredTracks = () => {
    switch (filter) {
      case "liked":
        return allTracks.filter(track => likedTrackIds.includes(track.id));
      case "downloaded":
        return allTracks.filter(track => downloadedTrackIds.includes(track.id));
      default:
        return allTracks;
    }
  };

  return (
    <div className="library-container">
      <h1 className="page-title">Your Library</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("liked")} className={filter === "liked" ? "active" : ""}>Liked</button>
        <button onClick={() => setFilter("downloaded")} className={filter === "downloaded" ? "active" : ""}>Downloaded</button>
      </div>

      {/* Track List */}
      <div className="track-list">
        {getFilteredTracks().length === 0 ? (
          <p>No tracks to display.</p>
        ) : (
          getFilteredTracks().map((track) => (
            <div key={track.id} className="track-card">
              <img src={track.artwork} alt={track.title} />
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <div className="track-actions">
                <button
                  className={`like-btn ${likedTrackIds.includes(track.id) ? "liked" : ""}`}
                  onClick={() => toggleLike(track.id)}
                >
                  ❤️
                </button>
                <button
                  className="download-btn"
                  onClick={() => handleDownload(track)}
                  disabled={downloadedTrackIds.includes(track.id)}
                  title={downloadedTrackIds.includes(track.id) ? "Already downloaded" : "Download"}
                >
                  ⬇
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default Library;