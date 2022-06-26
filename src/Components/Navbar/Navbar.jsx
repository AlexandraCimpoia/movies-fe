import React, {useState} from 'react'
import "./Navbar.scss"
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useFetch from "../useFetch/useFetch";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Navbar = ({ onItemSelect, onMyRatingsClick, onMyRecommendationsClick }) => {
    const history = useNavigate();

    const {data: genre, error} = useFetch('https://localhost:7058/api/Genres');

    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        history('/login');
    }

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="container-left">
                    <TheaterComedyIcon/>
                    <span className="app-name">Movie Recommender System</span>
                   {/* <Link to="/">
                        <span>Home</span>
                    </Link>*/}

                    <span
                        aria-controls='basic-menu'
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleClick}
                    >
                        Genres
                    </span>
                    {/*Drop Down Items*/}
                    <Menu id='basic-menu'
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleClose}
                    >
                        {error && <div>{error}</div>}
                        {genre && [{ genreId: null, genre1: 'All' }, ...genre].map((g) => {
                            return (
                                <MenuItem key={g.genreId} onClick={() => {
                                    handleClose();
                                    onItemSelect(g.genreId);
                                }}>{g.genre1}</MenuItem>
                            )

                        })}

                    </Menu>

                    <span>My List</span>
                    <span role="button" onClick={onMyRatingsClick}>My Ratings</span>
                    <span role="button" onClick={onMyRecommendationsClick}>My Recommendations</span>
                </div>
                <div className="container-right">
                    <SearchIcon className="icon"/>
                    <AccountCircleIcon className="icon"/>
                    <div className="account-container">
                        <ArrowDropDownIcon className="icon"/>
                        <div className="options">
                            <span className="log-out" onClick={handleLogOut}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;