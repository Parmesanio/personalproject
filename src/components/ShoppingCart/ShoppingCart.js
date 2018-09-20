import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/reducer';

const ShoppingCart = (props) => {
    let { sessionCart, removeFromCart, sessionTotal } = props;
    let mappedCart = sessionCart.map((product, index)=> {
        let { name, price, product_url } = product
        return <div key={index}>
                <img src={product_url} alt={name} />
                <h4>{name}</h4>
                <p>${price}</p>
                <button onClick={() => removeFromCart(product.id)}>Remove From Cart</button>
        </div>
    })
    console.log(sessionTotal);
    
    return ( 
        <div>
            <h1>Total: {sessionTotal}</h1>
            <h3>Current Order</h3>
            {mappedCart}
        </div>
     );
}

const mapStateToProps = state => {
    let { sessionCart, sessionTotal } = state.primates;
    console.log('SESSION TOTAL',sessionTotal);
    
    return {
        sessionCart,
        sessionTotal
    }
}
 
export default connect(mapStateToProps, {removeFromCart})(ShoppingCart);