import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/reducer';

class Products extends Component {
    componentDidMount() {
        this.props.setProducts();
    }
    render() { 
        let { productList, addToCart } = this.props;
        
        let mappedProducts = productList.map(product => {
            let { description, in_stock, name, price, product_url } = product
            return <div key={product.id}>
                <img src={product_url} alt={name} />
                <h4>{name}</h4>
                <p>${price}</p>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
                <Link to={`/products/${product.id}`}><button>More Info</button></Link>
            </div>
        });
        return ( 
            <div>
                Products
                {mappedProducts}
            </div>
         );
    }
}
const mapStateToProps = state => {
    let { productList } = state.primates
    return {
        productList
    }
}
 
export default connect(mapStateToProps, {setProducts, addToCart})(Products);