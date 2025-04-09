// src/components/SearchResults.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/SearchResults.css";
import { searchTracks, formatTrack } from "../service/openwhyd";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            
            const searchParams = new URLSearchParams(location.search);
            const query = searchParams.get('q');
            
            if (!query) {
                setError("No search query provided");
                setLoading(false);
                return;
            }
            
            try {
                const searchResults = await searchTracks(query, 20);
                const formattedResults = searchResults.map(formatTrack);
                setResults(formattedResults);
                setError(null);
            } catch (err) {
                console.error("Error fetching search results:", err);
                setError("Failed to load search results. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchResults();
    }, [location.search]);

    return (
        <div className="search-results-container">
            <h1 className="page-title">
                Search Results for "{new URLSearchParams(location.search).get('q')}"
            </h1>
            
            {loading && <div className="loading">Searching for tracks...</div>}
            
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && results.length === 0 && (
                <div className="no-results">No results found. Try a different search term.</div>
            )}
            
            <div className="results-grid">
                {results.map((track) => (
                    <div key={track.id} className="track-card">
                        <img src={track.artwork} alt={track.title} />
                        <h2 className="track-title">{track.title}</h2>
                        <p className="track-artist">{track.artist}</p>
                        {track.url && (
                            <a 
                                href={track.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="listen-button"
                            >
                                Listen on SoundCloud
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;