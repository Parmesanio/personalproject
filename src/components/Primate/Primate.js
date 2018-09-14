import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Primate extends Component {
    render() { 
        let { id, name, species, dob, gender, photo_urls, bio} = this.props
    let mappedPhotos = photo_urls.map((photo, i) => {
        return <img key={i} src={photo} alt={name} />
    })
    return ( 
        this.props.location.pathname === '/meet-the-primates' ? 
        <Link to={`/meet-the-primates/${id}`}><div>
            <img src={photo_urls[0]} alt={name} />
            <h1>{name}</h1>
            <h2>{species}</h2>
            
        </div></Link>
        : 
        <div>
        {mappedPhotos}
        <h1>{name}</h1>
        <h2>{species}</h2>
        <h3>{dob}</h3>
        <h4>{gender}</h4>
        <p>{bio}</p>
    </div>
     );
    }
}
 
export default withRouter(Primate);