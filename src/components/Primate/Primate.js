import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Primate = (props) => {
        let { id, name, species, photo_urls} = props;
    return ( 
        <Link onMouseEnter={() => props.handleHover()} onMouseLeave={() => props.handleHover()} className="diamond" key={id} to={`/meet-the-primates/${id}`}>
            <img src={photo_urls[0]} alt={name} />
            <div className={`${props.isHovered && 'showDesc'} hidden`}>
            <h1>{name}</h1>
            <h2 >{species}</h2>
            <button className={`meetButton`}>Meet {name}</button>
            </div>
        </Link>
     );
}
 
export default Primate