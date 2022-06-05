import './MovieCard.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useState} from "react";
import {Rating, Tooltip, Typography, Zoom} from "@mui/material";

const MovieCard = ({details}) => {
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);

    return (
        <div className="container">
            <div className="trailer">
                <iframe width="100%" height="450" src="https://www.youtube.com/embed/hYcw5ksV8YQ"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>
            <div className="top-container">
                <h1 className="title">{details && details.title}</h1>
                <div className="buttons">
                    <button className="play">
                        <PlayArrowIcon/>
                    </button>
                    <button className="add">
                        <AddRoundedIcon/>
                    </button>
                    <button className="rate">
                        <Tooltip
                            TransitionComponent={Zoom}
                            title={<div>
                                    <Typography component="legend">Rate this movie!</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={ratingValue}
                                        onChange={(event, newValue) => {
                                            setRatingValue(newValue);
                                        }}
                                    />
                                </div>}
                            arrow
                            classes={{
                                tooltip: 'rating-tooltip'
                            }}
                            placement="right"
                            >
                            <ThumbUpOutlinedIcon onClick={() => setIsRatingOpen(true)}/>
                        </Tooltip>
                    </button>
                </div>
            </div>
            <div className="details-container">
                <span className="year">{details && details.year}</span>
                <span className="rating">{details && details.rating}</span>
                <span className="certification">{details && details.certification}</span>
                <span className="run-time">{details && details.runTime}</span>
            </div>
            <div className="bottom-container">
                <div className="left">
                    <div className="description">{details && details.description}</div>
                </div>
                <div className="right">
                    <div className="genres">Genres:</div>
                    <div className="cast">Cast:</div>
                    <div className="director">Director: {details && details.director}</div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;