import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/reducer';
import StripeCheckout from 'react-stripe-checkout';


class ProductDetails extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    componentDidMount() {
        console.log('fired');
        this.props.setProducts();
    }
    render() { 
        let { productList, addToCart } = this.props;
        console.log('productList', productList);
    
        let product = productList.find(item => item.id == this.props.match.params.id) || '';
        console.log(product);
        let { in_stock, name, price, product_url, description } = product;
        return ( 
            <div>
                {product !== undefined && product !== '' ?  <div>
                 <img src={product_url} alt={name} />
                 <h3>{name}</h3>
                 <p>${price}</p>
                 <p>{in_stock ? 'In Stock' : 'Sold Out'}</p>
                 <hr />
                 <ul>
                     <li>Small: {description.dimensions.small}</li>
                     <li>Medium: {description.dimensions.medium}</li>
                     <li>{description.information}</li>
                 </ul>
                 <button onClick={() => addToCart(product)}>Add To Cart</button>
                 </div> 
                 :
                 null
                }
             </div>
         );
    }
}

const mapStateToProps = state => {
    let { productList } = state.primates;
    
    return {
        productList
    }
}
 
export default connect(mapStateToProps, {setProducts, addToCart})(ProductDetails);