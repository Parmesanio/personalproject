import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/primateReducer';
import ProductDetails from '../ProductDetails/ProductDetails';
import './products.css';
const Products = (props) => {
        let {  addToCart, productList } = props.props;
        let mappedProducts = [],
            mappedStorage  = [];
        if(navigator.onLine) {
            mappedProducts = productList.map(product => {
                let { description, in_stock, name, price, product_url } = product
                return <div key={product.id}>
                    <img src={product_url} alt={name} />
                    <div className="product-description">
                        <h4>{name}</h4>
                        <p>${price}</p>
                    </div>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                    {" "}
                    <Link to={`/products/${product.id}`}><button className="moreInfo">More Info</button></Link>
                </div>
            });
        } else if(localStorage.getItem('products')) {
            mappedStorage = JSON.parse(localStorage.getItem('products')).map((product, i) => {
                let { description, in_stock, name, price, product_url } = product
                return <div key={product.id}>
                <img src={product_url} alt={name} />
                <div className="product-description">
                    <h4>{name}</h4>
                    <p>${price}</p>
                </div>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
                {" "}
                <Link to={`/products/${product.id}`}><button className="moreInfo">More Info</button></Link>
            </div>
        }) 
    }
        return ( 
            <div className="products">
                {navigator.onLine ? mappedProducts : mappedStorage}
            </div>
         );
}
export default Products;