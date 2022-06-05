import './MovieList.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from "../ListItem/ListItem";
import {useEffect, useRef, useState} from "react";
import useFetch from "../useFetch/useFetch";
import {Dialog, Modal} from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import {shuffleArray} from "../../utils";

const MovieList = ({genreId}) => {

    //const {data: action_movies} = useFetch('https://localhost:7058/api/Movies/action_movies');
    const { data } = useFetch(`https://localhost:7058/api/Movies?genreId=${genreId}`);
    const [movies, setMovies] = useState([]);
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [isModalOPen, setisModalOPen] = useState(false);
    const [details, setDetails] = useState({});

    const listRef = useRef();

    // de fiecare data cand se se schimba data (adica cand se face fetch) se apleaza acel setMovies cu randomized(shuffled) array
    useEffect(() => {
        if (!Array.isArray(data)) {
            return;
        }
        setMovies(shuffleArray(data));
    }, [data]);


    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${500 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-500 + distance}px)`;
        }
    };

    const handleMovieClick = (id) => {
        fetch(`https://localhost:7058/api/Movies/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('fetch failed');
                }
                return res.json();
            })
            .then(data => {
                setisModalOPen(true);
                setDetails(data);
            })
    }

    return (
        <div className="movie-wrapper">
            <ArrowBackIosNewIcon className='slider left'
                                 onClick={() => handleClick("left")}
                                 style={{display: !isMoved && "none"}}/>
            <div className="movie-container" ref={listRef}>
                {(movies || []).map(movie =>
                    <ListItem key={movie.movieid} poster={movie.poster} onClick={handleMovieClick} id={movie.movieid}/>
                )}
            </div>
            <ArrowForwardIosIcon className='slider right'
                                 onClick={() => handleClick("right")}/>

            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={isModalOPen}
                onClose={() => setisModalOPen(false)}
                classes={{
                    paper: 'dialog-paper'
                }}
            >
                <MovieCard details={details} />
            </Dialog>
        </div>
    );
}

export default MovieList;