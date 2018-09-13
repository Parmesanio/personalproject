import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logIn } from '../../redux/reducer';

import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isToggled: false
         }
         this.handleToggle = this.handleToggle.bind(this);
         this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        this.props.logIn();
      }

    handleToggle() {
        this.setState({
            isToggled: !this.state.isToggled
        })
    }
    logOut() {
        console.log('fired');
        axios.post('/api/logout')
            .then(() => window.location.href="/")
            .catch(err => console.log('Err in logging out', err));
    }
    render() { 
        let { isToggled } = this.state;
        let { admin } = this.props;
        return ( 
            <header>
                <div className='brand'>
                <h1>Logo</h1>
                </div>
                <nav className={isToggled ? 'show' : ''}>
                    {admin.name && <div><img src={admin.picture} alt={admin.name} /> <p>Welcome, {admin.name}</p></div> }
                    <Link to='/'>Home</Link>
                    <Link to='/meet-the-primates'>Meet The Primates</Link>
                    <Link to='/about'>Who We Are</Link>
                    <Link to='/volunteer'>Get Involved</Link>
                    <a target='_blank' className='donate' href='https://www.paypal.com/donate/?token=BjnyMgA-8HpjVGo-8xkkoF3J-D6rZcn-CA-z8lDWQKBsQBUZG566VB1rP5mX1XbyfhyxAG&country.x=US&locale.x=US'>Donate</a>
                    {admin.name && <Link to='/add-primate'>Add Primate</Link>}
                    {admin.name && <button onClick={this.logOut}>Logout</button>}
                </nav>
                <button onClick={this.handleToggle}>{isToggled ? 'X' : 'Menu'}</button>
            </header>
         );
    }
}
const mapStateToProps = state => {
    let { admin } = state.primates;
    return {
        admin
    }
}
const mapDispatchToProps = {
    logIn
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);