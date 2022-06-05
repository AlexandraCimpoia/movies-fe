import React, {useState} from 'react'
import "./Home.scss"
import Navbar from "../../Components/Navbar/Navbar";
import FeaturedMovie from "../../Components/FeaturedMovie/FeaturedMovie";
import MovieList from "../../Components/MovieList/MovieList";
import useFetch from "../../Components/useFetch/useFetch";

const Home = () => {
    const {data: genres, error} = useFetch('https://localhost:7058/api/Genres');
    const [selectedGenre, setSelectedGenre] = useState(null);

    return (
        <div className="home-container">
            <Navbar onItemSelect={(param) => { setSelectedGenre(param); }}/>
            <FeaturedMovie/>
            <div className='movie-list'>
                {(genres || [])
                    .filter(genre => !selectedGenre || genre.genreId === selectedGenre)
                    .map((genre) => {
                    return (
                        <div key={genre.genreId}>
                            <span className="list-title">
                                {genre.genre1}
                            </span>
                            <MovieList genreId={genre.genreId}/>
                        </div>
                    )

                })}
            </div>

        </div>
    )
}
export default Home;