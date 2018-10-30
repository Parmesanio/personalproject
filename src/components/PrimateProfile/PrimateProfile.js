import React, { Component } from 'react';
import axios from 'axios';
import './primateprofile.css';

class PrimateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            images: [],
            modal: false
        }
        this.handleModal = this.handleModal.bind(this);
    }
    componentDidMount() {
        let profile = {};
        if(navigator.onLine) {
            profile = this.props.props.primateList.find(primate => primate.id == this.props.props.match.params.id);
        } else {
            profile = JSON.parse(localStorage.getItem('primates')).find(primate => primate.id == this.props.props.match.params.id);
        }
        this.setState({
            profile,
            images: profile.photo_urls
        })
    }
    handleModal(index) {
        this.setState({
            modal: !this.state.modal
        })
        let modal = document.getElementById("modal-image");
        let { images } = this.state;
        let image_url = images.find((image, i) => i == index);
        modal.src = image_url;
             
    }
    render() { 
        let { profile, modal, images } = this.state;
        let { name, species, dob, gender, bio, photo_urls } = profile;
        let mappedPhotos = images.map((photo, i) => {
            return <img key={i} onClick={() => this.handleModal(i)} className="gallery-image" src={photo} alt={name} />
        })
    return ( 
        <div className="primateProfile-container">
        <button onClick={() => this.props.props.history.goBack()}>Go Back</button>
        <div className="primateProfile">
            <img src={images[0]} alt={profile.name} />
            <h1>{name}</h1>
            <h2>{species}</h2>
            <h3>Born: {dob}</h3>
            <h4>Gender: {gender}</h4>
            <p>{bio}</p>
            <br />
            <h3>Image Gallery</h3>
            <div className="gallery">
                {mappedPhotos}
            </div>
        </div>
            <div className={`modal-container ${modal ? 'modal-container-show' : '' }`} onClick={() => this.handleModal()}>
                    <div id="modal" className={`modal ${modal ? 'modal-show' : ''}`} >
                    <img id="modal-image" src='' alt='Primate Modal' />
                    </div>
                </div>
        </div>
     );
    }
}
 
export default PrimateProfile;