import './MovieCard.scss'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useContext, useEffect, useState} from "react";
import {Rating, Tooltip, Typography, Zoom} from "@mui/material";
import {useNavigate} from "react-router-dom";
import YouTube from 'react-youtube';
import {UserContext} from "../../Context/UserContext";

const MovieCard = ({details}) => {
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const handlePlayBtnClick = () => {
        navigate('../play');
    }

    useEffect(() => {
        fetch(`https://localhost:7058/api/Ratings?movieId=${details.movieid}&userId=${userId}`)
            .then(response => response.json())
            .then(({rating}) => {
                setRatingValue(rating);
            });
    }, []);

    return (
        <div className="container">
            <div className="trailer">
                <iframe width="100%" height="450" src={details.trailer}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>

            <div className="top-container">
                <h1 className="title">{details && details.title}</h1>
                <div className="buttons">
                    <button className="play" onClick={handlePlayBtnClick}>
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
                                            fetch("https://localhost:7058/api/Ratings", {
                                                method: "POST",
                                                headers: {
                                                    "content-type": "application/json"
                                                },
                                                body: JSON.stringify({userId: Number(userId), movieId: details.movieid, rating1: newValue})
                                            })
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
                    <div className="genres"><b>Genres:</b> Action, Adventure, Drama , Fantasy</div>
                    <div className="cast"><b>Cast:</b> Viggo Mortensen, Elijah Wood, Ian McKellen, Orlando Bloom</div>
                    <div className="director"><b>Director:</b> Peter Jackson</div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;