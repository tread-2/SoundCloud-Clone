import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      {/* Logo WIP*/}
      <div className="logo">
        <Link to="/"> 
          <img src="/logo.png" alt="SoundCloud Clone" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for music..." />
        <button>Search</button>
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
