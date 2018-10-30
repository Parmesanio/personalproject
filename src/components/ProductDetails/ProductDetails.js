import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/primateReducer';
import './productdetails.css';
import PropTypes from 'prop-types';


const ProductDetails = (props) => {
        let { productList, addToCart, admin, match, history} = props.props;
        let product = productList.find(item => item.id == match.params.id)
        let { in_stock, name, price, product_url, dimensions, sizes, description } = product
    
        return ( 
            <div className="productDetails">
            <button onClick={() => history.goBack()}>Go Back</button>
                {product && product !== '' ?  <div>
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
                 {admin && <button className="editButton" to={`/add-product/${match.params.id}`}>Edit Product</button>}
                 </div> 
                 :
                 null
                }
             </div>
         );
}
 
export default ProductDetails;

ProductDetails.propTypes = {
    productList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired, 
        price: PropTypes.string.isRequired, 
        product_url: PropTypes.string.isRequired,
        admin_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        dimensions: PropTypes.arrayOf(PropTypes.string.isRequired),
        in_stock: PropTypes.bool.isRequired,
        sizes: PropTypes.string.isRequired
    }))
}