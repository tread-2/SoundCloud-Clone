import { useState, useEffect, useRef } from "react";
import "./styles/Upload.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [songs, setSongs] = useState([]);
  const fileInputRef = useRef(null);

  // Allowed file types
  const allowedTypes = ["audio/mpeg", "audio/wav", "audio/flac", "audio/ogg"];

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setError(""); // Clear errors if the file is valid
    } else {
      setSelectedFile(null);
      setError("Please upload a valid music file (MP3, WAV, FLAC, OGG)");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("No file selected!");
      return;
    }
  
    const fileURL = URL.createObjectURL(selectedFile);
    const newSong = {
      name: selectedFile.name,
      url: fileURL,
      type: selectedFile.type,
    };
  
    const existingSongs = JSON.parse(localStorage.getItem("songs")) || [];
    const updatedSongs = [...existingSongs, newSong];
    setSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
  
    //  Mark the "first upload" achievement
    if (!localStorage.getItem("achievement_first_upload")) {
      localStorage.setItem("achievement_first_upload", "true");
    }
  
    setSelectedFile(null);
  };

  // Load songs from localStorage
  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("songs")) || [];
    setSongs(storedSongs);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem("songs");
    setSongs([]);
  };
  
  // Display the upload information
  return (
    <div className="upload-container">
      <h1>Upload Your Music</h1>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button style={{ marginRight: '10px' }} onClick={triggerFileInput}>Choose File</button>

      {error && <p className="error">{error}</p>}
      {selectedFile && <p className="file-name">Selected: {selectedFile.name}</p>}

      <button style={{ marginRight: '10px' }} onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>

      <button onClick={handleClearAll}>Clear All</button>

      <div className="song-list">
        <h2>Uploaded Songs</h2>
        {songs.length === 0 ? (
          <p>No songs uploaded yet.</p>
        ) : (
          songs.map((song, index) => (
            <div key={index} className="song-item">
              <audio controls>
                <source src={song.url} type={song.type} />
                Your browser does not support the audio element.
              </audio>
              <p>{song.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Upload;
