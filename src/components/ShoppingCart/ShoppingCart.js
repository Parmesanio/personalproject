import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, setCart } from '../../redux/reducer';
import { Link, Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './shoppingcart.css';

class ShoppingCart extends Component {
    constructor() {
        super();
        this.state = {
            orderComplete: false,
            order: [],
            qty: 0
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    fromDollarToCent = amount => amount * 100;
    onToken = token => {
        axios.post('/save-stripe-token', {
            token,
            amount: this.fromDollarToCent(this.props.sessionTotal)
        })
        .then(response => {
            this.props.setCart();
            this.setState({
                orderComplete: true,
                order: response.data
            })
        }).catch(err => err);
      }
    render() {
        let { order } = this.state;
        let { sessionCart, removeFromCart, sessionTotal } = this.props;
        let mappedCart = sessionCart.map((product, index)=> {
            let { name, price, product_url } = product
            return <div key={index} className="product">
                    <img src={product_url} alt={name} />
                    <div>
                        <p>{name}</p>
                        <p>${parseFloat(price)}</p>
                        <button className="delete" onClick={() => removeFromCart(product.id)}>Remove From Cart</button>
                    </div>
            </div>
        })
        return ( 
            <div className="checkout">
            {this.state.orderComplete ? <div>
            <h1>Order Completed</h1>
            <h3>Order Summary</h3>
            <ul>
                <li>{order.source.name}</li>
                <li>{order.source.address_line1}</li>
                <li>{order.source.address_city}</li>
                <li>{order.source.address_zip}</li>
                <li>{order.source.address_country}</li>
                {order.source.address_line2 && <li>{order.source.address_line2}</li>}
            </ul>
            <p>{order.description}</p>
            <p>${order.amount / 100}</p>
            <p>A receipt has been sent to your email.</p>
            <p>Thanks for shopping!</p>
            <Link to='/'>Home</Link>
      </div> :
            <div>
            
            <h3>Current Order ({sessionCart.length} items) </h3>
            <hr />
            {mappedCart}
            <h1>Total: ${sessionTotal.toFixed(2)}</h1>
            <StripeCheckout
                    name="Talkin' Monkeys Project"
                    amount={this.fromDollarToCent(sessionTotal)}
                    token={this.onToken}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                    shippingAddress={true}
                    billingAddress={true}
                    />
                
        </div>}
        </div>

         );
    }
    
}
const mapStateToProps = state => {
    let { sessionCart, sessionTotal } = state.primates;
    return {
        sessionCart,
        sessionTotal
    }
}
 
export default connect(mapStateToProps, {removeFromCart, setCart})(ShoppingCart);