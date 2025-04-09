import { useState } from "react";
import "./styles/Upload.css"; 

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

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

    // Handle File Upload
    const handleUpload = () => {
        if (!selectedFile) {
            setError("No file selected!");
            return;
        }

        // Placeholder for now – later, this will send the file to the SoundCloud API
        console.log("Uploading file:", selectedFile.name);
        alert(`Uploaded: ${selectedFile.name}`);
    };

    return (
        <div className="upload-container">
            <h1>Upload Your Music</h1>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            
            {error && <p className="error">{error}</p>}
            {selectedFile && <p className="file-name">Selected: {selectedFile.name}</p>}

            <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
        </div>
    );
};

export default Upload;
