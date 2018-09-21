import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
class Checkout extends Component {
    render() {  
        return ( 
            <div>
                <StripeProvider apiKey="pk_test_LcmEKJ7CVohHZeNgbJANn1ZF">
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </StripeProvider>
                <ShoppingCart />
            </div>
         );
    }
}

export default Checkout;