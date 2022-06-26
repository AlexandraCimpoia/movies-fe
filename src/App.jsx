import './App.scss';
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path = "/" element={<Home />}/>
                <Route exact path = "/login" element={<Login />}/>
                <Route exact path = "/register" element={<Register />}/>
            </Routes>
        </Router>
    );
}

export default App;
