import './GenreSlider.scss';
import {useEffect, useRef, useState} from "react";
import useFetch from "../useFetch/useFetch";
import {shuffleArray} from "../../utils";
import MovieSlider from "../MovieSlider/MovieSlider";

const GenreSlider = ({genreId}) => {
    const { data } = useFetch(`https://localhost:7058/api/Movies?genreId=${genreId}`);
    const [movies, setMovies] = useState([]);

    // de fiecare data cand se se schimba data (adica cand se face fetch) se apleaza acel setMovies cu randomized(shuffled) array
    useEffect(() => {
        if (!Array.isArray(data)) {
            return;
        }
        setMovies(shuffleArray(data));
    }, [data]);

    return (
        <MovieSlider movies={movies} />
    );
}

export default GenreSlider;