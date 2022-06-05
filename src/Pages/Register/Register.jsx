import './Register.scss'
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("");
    const [isEmailComplete, setIsEmailComplete] = useState(false);
    const [password, setPassword] = useState("");

    const history = useNavigate();

    const passwordRef = useRef();

    const handleStart = () => {
        setIsEmailComplete(true);
    }

    const handleFinish = () => {
        // validate and redirect
        if (email === 'a' && password === 'b') {
            history('/');
        }  else {
            setIsEmailComplete(false);
        }
    }

    const handleEmailChange = ({ target: { value }}) => {
        setEmail(value);
    };

    const handlePasswordChange = ({ target: { value }}) => {
        setPassword(value);
    };

    const clickLogin = () => {
        history('/login');
    };

    return (
        <div className="register">
            <div className="top-section">
                <span>Movies Recommender System</span>
                <button className='login-btn' onClick = {clickLogin}>Sign In</button>
            </div>
            <div className="container">
                <h1>Ready to watch?</h1>
                <h2>Create an account!</h2>
                {!isEmailComplete ? (
                    <div className="input-container">
                        <input type='email' placeholder='email address' onChange={handleEmailChange}/>
                        <button className="register-btn" onClick={handleStart}>Get Started</button>
                    </div>
                ) : (
                    <form className="input-container">
                        <input type='password' placeholder='password' onChange={handlePasswordChange}/>
                        <button className="register-btn" onClick={handleFinish}>Register!</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Register;