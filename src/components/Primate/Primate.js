import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPrimates } from '../../redux/reducer';

class Primate extends Component {
    render() { 
        let { id, name, species, photo_urls} = this.props
    return ( 
        <Link key={id} to={`/meet-the-primates/${id}`}><div>
            <img src={photo_urls[0]} alt={name} />
            <h1>{name}</h1>
            <h2>{species}</h2>  
        </div></Link>
     );
    }
}
const mapStateToProps = state => {
    let { primateList } = state.primates;
    return {
        primateList
    }
}
 
export default connect(mapStateToProps, {setPrimates})(Primate);