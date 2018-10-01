import React from 'react';
import oopsVideo from '../images/Import - Export.mp4';
import './oops.css';

const Oops = (props) => {
    return ( 
        <div className="oops">
            <h2>Oops!  There's nothing here...</h2>
            <br />
            <br />
            <h3>Import & Export</h3>
            <br />
            <br />
            <video id="tylerVideo" width="400" poster="https://i.vimeocdn.com/video/722438498_1280.jpg" controls autoPlay={false} preload="auto" loop={true}>
                    <source src={oopsVideo} type="video/mp4" />
                    Your browser does not support HTML5 video.
                    </video>
        </div>
     );
}
 
export default Oops;