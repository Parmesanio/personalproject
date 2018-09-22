import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
class Checkout extends Component {
    // onToken = (token) => {
    //     console.log('TOKEN', JSON.stringify(token));
        
        // axios.post('/save-stripe-token', JSON.stringify(token))
        // .then(response => {
        //     console.log('RESPONSE',response);
            
        //     response.json().then(data => {
        //         console.log('DATA', data);
                
        //         alert(`We are in business, ${data.email}`);
        //     }).catch(err => console.log('Err in stripe token', err))
        // })
    //     fetch('/save-stripe-token', {
    //       method: 'POST',
    //       body: JSON.stringify(token),
    //     }).then(response => {
    //         console.log(response);
    //         response.json().then(data => {
    //             console.log('DATA', data.json());
    //             alert(`We are in business`);
    //           }).catch(err => console.log('Err in data', err));;
    //     }).catch(err => err)
    //   }
    render() {  
        return ( 
            <div>
                {/* <StripeProvider apiKey="pk_test_LcmEKJ7CVohHZeNgbJANn1ZF">
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </StripeProvider> */}
                {/* <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_LcmEKJ7CVohHZeNgbJANn1ZF"
                    // shippingAddress={true}
                    // billingAddress={true}
                    /> */}
                <ShoppingCart />
            </div>
         );
    }
}

export default Checkout;