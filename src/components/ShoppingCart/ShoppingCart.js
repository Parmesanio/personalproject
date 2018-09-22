import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, setCart } from '../../redux/reducer';
import StripeCheckout from 'react-stripe-checkout';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ShoppingCart extends Component {
    constructor() {
        super();
        this.state = {
            orderComplete: false
        }
    }
    fromDollarToCent = amount => amount * 100;
    onToken = token => {
        axios.post('/save-stripe-token', {
            token,
            amount: this.fromDollarToCent(this.props.sessionTotal)
        })
        .then(response => {
            console.log(response);
            this.props.setCart();
            this.setState({
                orderComplete: true
            })
        }).catch(err => err);
      }
    render() {
        // if (this.state.orderComplete) {
        //     return <Redirect to={`/OrderConfirm`}/>
        // }
        let { sessionCart, removeFromCart, sessionTotal } = this.props;
        let mappedCart = sessionCart.map((product, index)=> {
            let { name, price, product_url } = product
            return <div key={index}>
                    <img src={product_url} alt={name} />
                    <h4>{name}</h4>
                    <p>${parseFloat(price)}</p>
                    <button onClick={() => removeFromCart(product.id)}>Remove From Cart</button>
            </div>
        })
        return ( 
            <div>
            <StripeCheckout
                    name="The Takin' Monkeys Project, Inc."
                    amount={this.fromDollarToCent(sessionTotal)}
                    token={this.onToken}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                    shippingAddress={true}
                    billingAddress={true}
                    />
            <h1>Total: ${sessionTotal}</h1>
            <h3>Current Order</h3>
            {mappedCart}
        </div>

         );
    }
    
}

// const ShoppingCart = (props) => {
//     let { sessionCart, removeFromCart, sessionTotal } = this.props;
//     let mappedCart = sessionCart.map((product, index)=> {
//         let { name, price, product_url } = product
//         return <div key={index}>
//                 <img src={product_url} alt={name} />
//                 <h4>{name}</h4>
//                 <p>${parseFloat(price)}</p>
//                 <button onClick={() => removeFromCart(product.id)}>Remove From Cart</button>
//         </div>
//     })
//     onToken = (token) => {
//         console.log('TOKEN', JSON.stringify(token));
        
//         // axios.post('/save-stripe-token', JSON.stringify(token))
//         // .then(response => {
//         //     console.log('RESPONSE',response);
            
//         //     response.json().then(data => {
//         //         console.log('DATA', data);
                
//         //         alert(`We are in business, ${data.email}`);
//         //     }).catch(err => console.log('Err in stripe token', err))
//         // })
//         fetch('/save-stripe-token', {
//           method: 'POST',
//           body: JSON.stringify(token),
//         }).then(response => {
//             console.log(response);
//             response.json().then(data => {
//                 console.log('DATA', data.json());
//                 alert(`We are in business`);
//               }).catch(err => console.log('Err in data', err));;
//         }).catch(err => err)
//       }
    
//     return ( 
//         <div>
//             <StripeCheckout
//                     token={this.onToken}
//                     stripeKey="pk_test_LcmEKJ7CVohHZeNgbJANn1ZF"
//                     // shippingAddress={true}
//                     // billingAddress={true}
//                     amount={sessionTotal}
//                     />
//             <h1>Total: ${sessionTotal}</h1>
//             <h3>Current Order</h3>
//             {mappedCart}
//         </div>
//      );
// }

const mapStateToProps = state => {
    let { sessionCart, sessionTotal } = state.primates;
    return {
        sessionCart,
        sessionTotal
    }
}
 
export default connect(mapStateToProps, {removeFromCart, setCart})(ShoppingCart);