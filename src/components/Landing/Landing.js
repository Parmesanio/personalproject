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
                <div className="fb-page" data-href="https://www.facebook.com/The-Talkin-Monkeys-Project-227167320632809/" data-tabs="events" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/The-Talkin-Monkeys-Project-227167320632809/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/The-Talkin-Monkeys-Project-227167320632809/">The Talkin&#039; Monkeys Project</a></blockquote></div>
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