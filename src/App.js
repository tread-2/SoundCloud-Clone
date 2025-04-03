
import './App.css';
import { useState } from "react"; // Import useState
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Explore from './components/Explore';
import Profile from './components/Profile';
import Library from './components/Library';
import Upload from './components/Upload';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Settings = () => <h2 className="text-white text-center mt-10">Settings Pages</h2>;

function App() {
  // Define authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
