import React, { Component } from 'react';
import About from '../About/About';
import Donate from '../Donate/Donate';
import Welcome from '../Welcome/Welcome';
import { connect } from 'react-redux';
import { setWeather } from '../../redux/reducer';
import { withRouter } from 'react-router-dom';
import FacebookProvider, { Page } from 'react-facebook';
import video from '../images/Pexels Videos 3613.mp4';
import './landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHovered: false
         }
         this.handleHover = this.handleHover.bind(this);
    }
    componentDidMount() {
        this.props.setWeather();
    }
    handleHover() {
        this.setState({
            isHovered: !this.state.isHovered
        })
    }
    render() { 
        let { weather } = this.props;
        // let { city } = weather
        // console.log(city);
        console.log('WEATHER',weather);
        return ( 
            <div>
                <div className="landing">
                    <div className="showcase">
                    </div>
                    <div className="overlay">
                        <h3 className="title">
                            We Are<br /><br />
                            The Talkin' Monkeys Project
                        </h3>
                        {weather.length !== 0 ? <p className="weather"> Clewiston, FL | {Math.round(weather.main.temp)}ºF <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='Weather Icon' /></p> : <p>Weather Loading...</p>}
                    </div>
                    <video width="400" controls autoPlay={true} preload="auto" loop={true}>
                    <source src={video} type="video/mp4" />
                    {/* <source src={bideo} type="video/ogg" /> */}
                    Your browser does not support HTML5 video.
                    </video>
                </div>
                <Welcome />
                <About {...this.state} handleHover={this.handleHover}  />
                <Donate />
                <FacebookProvider appId="478006302682854">
                    <Page href="https://www.facebook.com/The-Talkin-Monkeys-Project-227167320632809/" tabs="events" />
                </FacebookProvider>
            </div>
         );
    }
}

const mapStateToProps = state => {
    let { admin, weather } = state.primates;
    return {
        admin,
        weather
    }
}
 
export default connect(mapStateToProps, {setWeather})(withRouter(Landing));