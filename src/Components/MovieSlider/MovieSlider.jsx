import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ListItem from "../ListItem/ListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Dialog} from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import {useRef, useState} from "react";

const MovieSlider = ({movies}) => {
    const [isModalOPen, setisModalOPen] = useState(false);
    const [details, setDetails] = useState({});
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef();

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

    const handleArrowClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${1000 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 10) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-1000 + distance}px)`;
        }
    };

    return (<div className="movie-wrapper">
        <ArrowBackIosNewIcon className='slider left'
                             onClick={() => handleArrowClick("left")}
                             style={{display: !isMoved && "none"}}/>
        <div className="movie-container" ref={listRef}>
            {(movies || []).map(movie =>
                <ListItem key={movie.movieid} poster={movie.poster} onClick={handleMovieClick} id={movie.movieid}/>
            )}
        </div>
        <ArrowForwardIosIcon className='slider right'
                             onClick={() => handleArrowClick("right")}/>

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
    </div>);
}

export default MovieSlider;