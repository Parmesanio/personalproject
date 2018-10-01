import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../images/dr_deb_about.jpg';
import './about.css';

class About extends Component {
    render() { 
        return ( 
            <section className="about">
            <div>
                <h3>Dr. Deborah Misotti</h3>
                <br />
                    <div onMouseEnter={this.props.handleHover} onMouseLeave={this.props.handleHover}>
                        <div className="image-deb"></div>
                        <br />
                        <p>Short Summary</p>
                        <br />
                    </div>
            </div>
            <div>
                <h3>Tom Misotti</h3>
                <br />
                    <div onMouseEnter={this.props.handleHover} onMouseLeave={this.props.handleHover}>
                        <div className="image-tom"></div>
                        <br />
                        <p>Short Summary</p>
                        <br />
                        <Link className={`${this.props.isHovered && 'aboutShow'} hide`} to='/about'>Meet Deb & Tom Misotti</Link>
                        <br />
                    </div>
            </div>
            <div>
                <h3>The Primates</h3>
                <br />
                    <div onMouseEnter={this.props.handleHover} onMouseLeave={this.props.handleHover}>
                        <div className="image-meet"></div>
                        <br />
                        <p>Short Summary</p>
                        <br />
                        <Link className={`${this.props.isHovered && 'aboutShow'} hide`} to='/meet-the-primates'>Meet The Primates</Link>
                        <br />
                    </div>
            </div>
            </section>
         );
    }
}
 
export default About;