import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Primate extends Component {
    render() { 
        let { id, name, species, photo_urls} = this.props
        
    return ( 
        <Link onMouseEnter={() => this.props.handleHoverEnter()} onMouseLeave={() => this.props.handleHoverExit()} className="diamond" key={id} to={`/meet-the-primates/${id}`}>
            <img src={photo_urls[0]} alt={name} />
            <div className={`${this.props.isHovered && 'showDesc'} hidden`}>
            <h1>{name}</h1>
            <h2 >{species}</h2>
            <button className={`meetButton`}>Meet {name}</button>
            </div>
        </Link>
     );
    }
}
const mapStateToProps = state => {
    let { primateList, isLoading } = state.primates;
    return {
        primateList,
        isLoading
    }
}
 
export default connect(mapStateToProps, {})(Primate);