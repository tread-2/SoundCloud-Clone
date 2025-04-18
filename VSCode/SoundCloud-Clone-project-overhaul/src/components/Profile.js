import { useState } from "react";
import "./styles/Profile.css"; 
import profilePic from "../assets/profile.jpg"; // Placeholder for profile picture

const Profile = () => {
    // Mock user data
    const user = {
        name: "John Doe",
        profilePicture: profilePic,
    };

    // Mock uploaded tracks
    const [uploadedTracks] = useState([
        { id: 1, title: "Summer Vibes", artwork: "https://source.unsplash.com/200x200/?music,summer" },
        { id: 2, title: "City Lights", artwork: "https://source.unsplash.com/200x200/?city,night" },
        { id: 3, title: "Chill Beats", artwork: "https://source.unsplash.com/200x200/?chill,lofi" },
    ]);

    // Mock achievements
    const achievements = [
        { id: 1, name: "First Upload", image: "https://source.unsplash.com/50x50/?trophy" },
        { id: 2, name: "100 Plays", image: "https://source.unsplash.com/50x50/?medal" },
        { id: 3, name: "Featured Artist", image: "https://source.unsplash.com/50x50/?star" },
    ];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profilePicture} alt="Profile" className="profile-pic" />
                <h1 className="username">{user.name}</h1>
            </div>

            {/* Achievement Section */}
            <div className="achievements-section">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-container">
                    {achievements.map((ach) => (
                        <div key={ach.id} className="achievement">
                            <img src={ach.image} alt={ach.name} />
                            <p>{ach.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="section-title">Uploaded Tracks</h2>
            <div className="tracks-container">
                {uploadedTracks.length > 0 ? (
                    uploadedTracks.map((track) => (
                        <div key={track.id} className="track-card">
                            <img src={track.artwork} alt={track.title} />
                            <h3>{track.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No tracks uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
