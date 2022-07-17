import React, {useContext, useRef, useState} from 'react'
import "./Home.scss"
import Navbar from "../../Components/Navbar/Navbar";
import FeaturedMovie from "../../Components/FeaturedMovie/FeaturedMovie";
import useFetch from "../../Components/useFetch/useFetch";
import GenreSlider from "../../Components/GenreSlider/GenreSlider";
import MovieSlider from "../../Components/MovieSlider/MovieSlider";
import {shuffleArray} from "../../utils";
import {UserContext} from "../../Context/UserContext";

const Home = () => {
    const {userId} = useContext(UserContext);
    const {data: genres, error} = useFetch('https://localhost:7058/api/Genres');
    const {data: ratedMovies, ratedMoviesError} = useFetch(`https://localhost:7058/api/Users/RatedMovies?userId=${userId}`);
    const {
        data: recommendedMovies,
        recommendedMoviesError
    } = useFetch(`https://localhost:7058/api/MovieRecommendations?userId=${userId}`);
    const {data: allMovies, allMoviesError} = useFetch("https://localhost:7058/api/Movies/AllMovies");
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchValue, setSearchValue] = useState(null);

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

    const handleOnSearch = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="home-container">
            <Navbar
                onItemSelect={(param) => {
                    setSelectedGenre(param);
                }}
                onMyRatingsClick={handleMyRatingsClick}
                onMyRecommendationsClick={handleMyRecommendationsClick}
                onSearch={handleOnSearch}
            />
            {!selectedGenre && !searchValue && <FeaturedMovie/>}
            <div className='movie-list'>
                {recommendedMovies && !searchValue &&
                (<div ref={myRecommendationsRef}>
                                <span className="list-title">
                                    My Recommended movies
                                </span>
                    <MovieSlider movies={shuffleArray(recommendedMovies || [])}/>
                </div>)}

                {ratedMovies &&  !searchValue &&
                (<div ref={myRatingsRef}>
                                <span className="list-title">
                                    My Ratings
                                </span>
                    <MovieSlider movies={shuffleArray(ratedMovies || [])}/>
                </div>)}

                { !searchValue && (genres || [])
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

                {searchValue &&
                (<div ref={myRatingsRef}>
                                <span className="list-title">
                                    Search list
                                </span>
                    <MovieSlider movies={(allMovies || []).filter((movie) => movie.title.toLowerCase().includes(searchValue.toLowerCase()))}/>
                </div>)}
            </div>
        </div>
    )
}
export default Home;