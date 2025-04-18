// src/context/TrackContext.js
import { createContext, useContext, useState, useEffect } from "react";

const TrackContext = createContext();

export const useTrackContext = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState(() => {
    const stored = localStorage.getItem("likedTracks");
    return stored ? JSON.parse(stored) : [];
  });

  const [downloadedTracks, setDownloadedTracks] = useState(() => {
    const stored = localStorage.getItem("downloadedTracks");
    return stored ? JSON.parse(stored) : [];
  });

  const addLikedTrack = (track) => {
    setLikedTracks((prev) => {
      const updated = [...prev, track].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      localStorage.setItem("likedTracks", JSON.stringify(updated));
      return updated;
    });
  };

  const addDownloadedTrack = (track) => {
    setDownloadedTracks((prev) => {
      const updated = [...prev, track].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      localStorage.setItem("downloadedTracks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TrackContext.Provider value={{ likedTracks, downloadedTracks, addLikedTrack, addDownloadedTrack }}>
      {children}
    </TrackContext.Provider>
  );
};