import "./FeaturedMovie.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import useFetch from "../useFetch/useFetch";

const FeaturedMovie = () => {

    const {data: movie, error} = useFetch('https://localhost:7058/api/Movies/63');

    return (
        <div className="featured-movie">
            <img
                src="https://m.media-amazon.com/images/M/MV5BOWVjM2FkMGUtODY4OC00ZDM2LWEzMmEtYTY4ZDM2NDBjYzQ2XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_.jpg"/>
            <div className="movie-info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Dune_2021_transparent_logo.png"/>
                <span className="description">
                    {error && <div>{error}</div>}
                    {movie && movie.description}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrowIcon/>
                        <span>Play</span>
                    </button>
                    <button className="add">
                        <AddIcon/>
                        <span>My List</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedMovie;