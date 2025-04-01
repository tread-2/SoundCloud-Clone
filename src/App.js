import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'; // Passes dummy data to the front end
import Footer from './components/Footer';
import Explore from './components/Explore';
import Profile from './components/Profile';
import Library from './components/Library';
import Upload from './components/Upload';



// const Profile = () => <h2 className="text-white text-center mt-10">Profile Pages</h2>
// const Feed = () => <h2 className="text-white text-center mt-10">Feed Pages</h2>
// const Library = () => <h2 className="text-white text-center mt-10">Library Pages</h2>
// const Upload = () => <h2 className="text-white text-center mt-10">Upload Pages</h2>
const Settings = () => <h2 className="text-white text-center mt-10">Settings Pages</h2>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
