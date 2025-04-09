import { useParams } from "react-router-dom";

const GenrePage = () => {
    const { genre } = useParams();

    return (
        <div className="genre-page">
            <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} Playlist</h1>
            <p>Tracks for the {genre} genre will be displayed here.</p>
        </div>
    );
};

export default GenrePage;
