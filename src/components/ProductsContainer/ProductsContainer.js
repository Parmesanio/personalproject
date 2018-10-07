import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts, addToCart } from '../../redux/productReducer';
import Products from '../Products/Products';
import ProductDetails from '../ProductDetails/ProductDetails';

class ProductsContainer extends Component {
    componentDidMount() {
        this.props.setProducts();
    }
    
    render() { 
        let { productList, addToCart } = this.props
        const products = withProductData(Products, {...this.props});
        const productDetails = withProductData(ProductDetails, {...this.props});
        return ( 
            <div>
                
                {this.props.match.path == '/products' && products}
                {this.props.match.path == '/products/:id' && productDetails  }
            </div>
         );
    }
}

const mapStateToProps = state => {
    let { productList } = state.products;
    return {
        productList
    }
}
const mapDispatchToProps = {
    setProducts,
    addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);

//HOC
//Product
function withProductData(WrappedComponent, props) {
    return <WrappedComponent props={props} />
}
