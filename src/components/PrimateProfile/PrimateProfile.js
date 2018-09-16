import React, { Component } from 'react';
import axios from 'axios';

class PrimateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        }
    }
    componentDidMount() {
        axios.get(`/api/primates/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    profile: res.data
                })
            }).catch(err => console.log('Err in primate profile axios.get', err));
    }
    render() { 
        let { profile } = this.state;
        let mappedProfile = profile.map(primate => {
            let { name, species, dob, gender, bio, photo_urls } = primate;
            let mappedPhotos = photo_urls.map((photo, i) => {
                return <img key={i} src={photo} alt={name} />
            })
            return <div>
            {mappedPhotos}
            <h1>{name}</h1>
            <h2>{species}</h2>
            <h3>{dob}</h3>
            <h4>{gender}</h4>
            <p>{bio}</p>
            </div>

        })
    return ( 
        <div>
            {mappedProfile}
        </div>
     );
    }
}
 
export default PrimateProfile;