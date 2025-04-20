// src/components/Navbar.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "../assets/soundcloud-logo.png";

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
      sessionStorage.setItem("searchQuery", searchQuery);
      sessionStorage.setItem("isSearching", "true");
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo + Main Nav Links */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="SoundCloud Clone" />
          </Link>
          <div className="left-links">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/library">Library</Link>
          </div>
        </div>

        {/* Center: Search */}
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right: Upload + Auth/Profile */}
        <div className="navbar-right">
          <Link to="/upload">Upload</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
