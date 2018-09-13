import React, { Component } from 'react';
import About from '../About/About';
import Donate from '../Donate/Donate';
import { connect } from 'react-redux';

class Landing extends Component {
    render() { 
        return ( 
            <div>
                Landing Page
                <About />
                <Donate />
                News
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
 
export default connect(mapStateToProps, {})(Landing);