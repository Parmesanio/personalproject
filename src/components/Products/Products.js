import React, { Component } from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import { setProducts } from '../../redux/reducer';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        this.props.setProducts();
    }
    render() { 
        let { productList } = this.props;
        let mappedProducts = productList.map(product => <Product key={product.id} {...product} />);
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
 
export default connect(mapStateToProps, {setProducts})(Products);