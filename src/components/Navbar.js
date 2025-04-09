// src/components/Navbar.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { searchTracks } from "../service/openwhyd";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Store search query in session storage to use in SearchResults component
      sessionStorage.setItem('searchQuery', searchQuery);
      sessionStorage.setItem('isSearching', 'true');
      
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/"> 
          <img src="/logo.png" alt="SoundCloud Clone" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for music..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/library">Library</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/upload">Upload</Link>

        {/* Auth Links */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;