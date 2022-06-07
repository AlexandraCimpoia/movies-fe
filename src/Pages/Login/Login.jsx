import './Login.scss'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailOrPasswordInvalid, setIsEmailOrPasswordInvalid] = useState(false);
    const navigate = useNavigate();

    const handleLoginBtnClick = async (event) => {
        event.preventDefault(); // stop refresh on button click
        try {
            const response = await fetch(`https://localhost:7058/api/Login?username=${email}&password=${password}`);
            const { isLoggedIn } = await response.json();

            if (isLoggedIn === 'true') {
                navigate('../');
                setIsEmailOrPasswordInvalid(false);
            } else {
                setPassword('');
                setEmail('');
                setIsEmailOrPasswordInvalid(true);
            }
        } catch (e) {
            console.dir(e);
        }
    }

    const handleEmailChange = ({target: {value}}) => {
        setEmail(value);
    }

    const handlePasswordChange = ({target: {value}}) => {
        setPassword(value);
    }

    const handleRegisterNow = () => {
        navigate('/register');
    }

    return (
        <div className="login">
            <div className="top-section">
                <span>Movies Recommender System</span>
            </div>
            <div className="input-container">
                <form>
                    <h1>Sign In</h1>
                    <input type='email' placeholder='email address' value={email} onChange={handleEmailChange}/>
                    { isEmailOrPasswordInvalid && <div className="err-msg">Incorrect email or password</div> }
                    <input type='password' placeholder='password' value={password} onChange={handlePasswordChange}/>
                    { isEmailOrPasswordInvalid && <div className="err-msg">Incorrect email or password</div> }
                    <button className="login-btn" onClick={handleLoginBtnClick}>Sign In</button>
                    <span onClick = {handleRegisterNow}>Don't have an account? <b>Register now.</b></span>
                </form>
            </div>
        </div>
    );
}

export default Login;