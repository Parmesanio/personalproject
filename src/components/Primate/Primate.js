import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Primate extends Component {
    render() { 
        let { id, name, species, photo_urls} = this.props
    return ( 
        <Link to={`/meet-the-primates/${id}`}><div>
            <img src={photo_urls[0]} alt={name} />
            <h1>{name}</h1>
            <h2>{species}</h2>  
        </div></Link>
     );
    }
}
 
export default Primate;