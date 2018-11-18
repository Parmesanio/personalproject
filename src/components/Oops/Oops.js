import React from 'react';
import oopsVideo from '../images/Swallowed a fly.mp4';
import './oops.css';

const Oops = (props) => {
    return ( 
        <div className="oops">
            <h2>Oops!  There's nothing here...</h2>
            <br />
            <br />
            <h3>Enjoy a man swallowing a fly mid video:</h3>
            <br />
            <br />
            <video id="tylerVideo" width="400" controls autoPlay={false} preload="auto" loop={true}>
                    <source src={oopsVideo} type="video/mp4" />
                    Your browser does not support HTML5 video.
                    </video>
        </div>
     );
}
 
export default Oops;