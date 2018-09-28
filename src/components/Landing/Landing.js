import React, { Component } from 'react';
import About from '../About/About';
import Donate from '../Donate/Donate';
import Welcome from '../Welcome/Welcome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FacebookProvider, { Page } from 'react-facebook';
import './landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHovered: false
         }
         this.handleHover = this.handleHover.bind(this);
    }
    handleHover() {
        this.setState({
            isHovered: !this.state.isHovered
        })
    }
    render() { 
        return ( 
            <div>
                <div className="landing">
                    <div className="showcase">
                    </div>
                    <div className="overlay">
                        <h3 className="title">We Are<br /><br />The Talkin' Monkeys Project</h3>
                        {/* Weather API Component Goes Here */}
                    </div>
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
    let { admin } = state.primates;
    return {
        admin
    }
}
 
export default connect(mapStateToProps, {})(withRouter(Landing));