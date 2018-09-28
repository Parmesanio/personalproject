import React from 'react';
import './welcome.css';

const Welcome = (props) => {
    return ( 
        <div className="welcome">
            <div className="welcome-content">
                <h3>Act on a local level. <br /><br /> Live on a global level.</h3>
                <p>Brief summary of the sanctuary & what can be done</p>
                <div className="welcome-experience">
                    <div data-num="1" className="experience">
                        <h4>Volunteer</h4>
                    </div>
                    <div data-num="2" className="experience">
                        <h4>Meet The Primates</h4>
                    </div>
                    <div data-num="3" className="experience">
                        <h4>???</h4>
                    </div>
                </div>
            </div>
                
        </div>
     );
}
 
export default Welcome;