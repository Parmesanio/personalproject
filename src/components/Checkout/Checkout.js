import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { connect } from 'react-redux';
import { setCart } from '../../redux/reducer';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        this.props.setCart();
    }

    render() { 
        let { sessionCart } = this.props;
        
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

const mapStateToProps = state => {
    let { sessionCart } = state.primates;
    return {
        sessionCart
    }
}
 
export default connect(mapStateToProps, {setCart})(Checkout);