import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import trailer from './trailer2.mp4'

import './Play.scss'

const Play = () => {
    return (
        <div className="play-movie">
            <div className="back-button">
                <KeyboardBackspaceIcon/>
                Home
            </div>
            <div className="video-container">
                <video muted controls autoPlay="true">
                    <source src={trailer} type="video/mp4"/>
                </video>
            </div>
        </div>
    );
}

export default Play;