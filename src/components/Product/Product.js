import React from 'react';

const Product = (props) => {
    console.log(props);
    let { description, in_stock, name, price, product_url } = props;
    return ( 
        <div>
            <img src={product_url} alt={name} />
            <h4>{name}</h4>
            <p>{price}</p>
        </div>
     );
}
 
export default Product;