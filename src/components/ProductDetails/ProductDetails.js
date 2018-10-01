import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/reducer';
import './productdetails.css';


class ProductDetails extends Component {
    componentDidMount() {
        this.props.setProducts();
    }
    render() { 
        let { productList, addToCart, admin } = this.props;
    
        let product = productList.find(item => item.id == this.props.match.params.id) || '';
        let { in_stock, name, price, product_url, dimensions, sizes, description } = product;
        return ( 
            <div className="productDetails">
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
                {product !== undefined && product !== '' ?  <div>
                 <img src={product_url} alt={name} />
                 <h3>{name}</h3>
                 <p>${price}</p>
                 <p>{in_stock ? 'In Stock' : 'Sold Out'}</p>
                 <hr />
                 <ul>
                     <li>Small: {dimensions[0]}"</li>
                     <li>Medium: {dimensions[1]}"</li>
                     <li>{description}</li>
                 </ul>
                 <br />
                 <button onClick={() => addToCart(product)}>Add To Cart</button>
                 {" "}
                 {admin && <button className="editButton" to={`/add-product/${this.props.match.params.id}`}>Edit Product</button>}
                 </div> 
                 :
                 null
                }
             </div>
         );
    }
}

const mapStateToProps = state => {
    let { productList, admin } = state.primates;
    
    return {
        productList,
        admin
    }
}
 
export default connect(mapStateToProps, {setProducts, addToCart})(ProductDetails);