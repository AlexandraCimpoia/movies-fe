import React, {useRef, useState} from 'react'
import "./Home.scss"
import Navbar from "../../Components/Navbar/Navbar";
import FeaturedMovie from "../../Components/FeaturedMovie/FeaturedMovie";
import useFetch from "../../Components/useFetch/useFetch";
import GenreSlider from "../../Components/GenreSlider/GenreSlider";
import MovieSlider from "../../Components/MovieSlider/MovieSlider";
import {shuffleArray} from "../../utils";

const Home = () => {
    const {data: genres, error} = useFetch('https://localhost:7058/api/Genres');
    const {data: ratedMovies, ratedMoviesError} = useFetch(`https://localhost:7058/api/Users/RatedMovies?userId=7`);
    const {
        data: recommendedMovies,
        recommendedMoviesError
    } = useFetch(`https://localhost:7058/api/MovieRecommendations?userId=7`);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const myRatingsRef = useRef(null);
    const myRecommendationsRef = useRef(null);

    const handleMyRatingsClick = () => {
        if (!myRatingsRef?.current) {
            return;
        }

        myRatingsRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }

    const handleMyRecommendationsClick = () => {
        if (!myRecommendationsRef?.current) {
            return;
        }

        myRecommendationsRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }

    return (
        <div className="home-container">
            <Navbar
                onItemSelect={(param) => {
                    setSelectedGenre(param);
                }}
                onMyRatingsClick={handleMyRatingsClick}
                onMyRecommendationsClick={handleMyRecommendationsClick}
            />
            <FeaturedMovie/>
            <div className='movie-list'>
                {recommendedMovies &&
                (<div ref={myRecommendationsRef}>
                                <span className="list-title">
                                    My Recommended movies
                                </span>
                    <MovieSlider movies={shuffleArray(recommendedMovies || [])}/>
                </div>)}

                {ratedMovies &&
                (<div ref={myRatingsRef}>
                                <span className="list-title">
                                    My Ratings
                                </span>
                    <MovieSlider movies={shuffleArray(ratedMovies || [])}/>
                </div>)}

                {(genres || [])
                    .filter(genre => !selectedGenre || genre.genreId === selectedGenre)
                    .map((genre) => {
                        return (
                            <div key={genre.genreId}>
                            <span className="list-title">
                                {genre.genre1}
                            </span>
                                <GenreSlider genreId={genre.genreId}/>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default Home;