import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCart } from '../../redux/productReducer';
import { logIn, setWeather } from '../../redux/primateReducer';

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
        this.props.setCart();
      }

    handleToggle() {
        this.setState({
            isToggled: !this.state.isToggled
        })
    }
    logOut() {
        axios.post('/api/logout')
            .then(() => window.location.href="/")
            .catch(err => console.log('Err in logging out', err));
    }
    render() { 
        let { isToggled } = this.state;
        let { admin, sessionCart } = this.props;
        return ( 
            <header>
                <div className='brand'>
                <h3><Link to="/">The Talkin' Monkeys Project</Link></h3>
                </div>
                <nav className={isToggled ? 'show' : ''}>
                {admin.name ? window.innerWidth > 992 ? <ul className="admin">
                        <li>Admin <span className="caret"></span></li>
                        <li className="dropdown-content"><img src={admin.picture} alt={admin.name}  /></li>
                        <li className="dropdown-content"><Link to='/add-primate'>Add Primate</Link></li>
                        <li className="dropdown-content"><Link to='/add-product'>Add Product</Link></li>
                        <li className="dropdown-content"><Link to='/' onClick={this.logOut}>Logout</Link></li>
                        </ul>
                        :
                        <ul className="admin">
                        <li className="dropdown-content"><img src={admin.picture} alt={admin.name}  /></li>
                        <li className="dropdown-content"><Link to='/add-primate'>Add Primate</Link></li>
                        <li className="dropdown-content"><Link to='/add-product'>Add Product</Link></li>
                        <li className="dropdown-content"><Link to='/' onClick={this.logOut}>Logout</Link></li>
                        </ul>
                        : 
                        null
                     }
                    <Link to='/'>Home</Link>
                    <Link to='/meet-the-primates'>Meet The Primates</Link>
                    <Link to='/about'>Who We Are</Link>
                    <Link to='/volunteer'>Get Involved</Link>
                    <Link className="paypal-link" to='/donate'>Donate</Link>
                    <Link to='/products'>Shop</Link>
                    <Link to='/checkout'>Cart ({sessionCart.length})</Link>
                </nav>
                <button className="menu" onClick={this.handleToggle}>{isToggled ? `x` : '☰'}</button>
            </header>
         );
    }
}
const mapStateToProps = state => {
    let { admin } = state.primates;
    let { sessionCart } = state.products;
    return {
        admin,
        sessionCart
    }
}
const mapDispatchToProps = {
    logIn,
    setCart,
    setWeather
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);