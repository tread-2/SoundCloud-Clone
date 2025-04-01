import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./styles/Navbar.css";

const Navbar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <h1>SoundCloud</h1>
            </div>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for music..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">🔍</button>
            </form>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/explore">Explore</a>
                <a href="/library">Library</a>
                <a href="/profile">Profile</a>
                <a href="/setting">Settings</a>
                <a href="/upload">Upload</a>
            </div>
        </nav>
    );
};

export default Navbar;