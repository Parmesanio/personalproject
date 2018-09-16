import React, { Component } from 'react';
import About from '../About/About';
import Donate from '../Donate/Donate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FacebookProvider, { Page } from 'react-facebook';

class Landing extends Component {
    render() { 
        return ( 
            <div>
                Landing Page
                <About />
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