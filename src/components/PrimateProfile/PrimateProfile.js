import React, { Component } from 'react';
import axios from 'axios';
import './primateprofile.css';

class PrimateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            image: [],
            modal: false
        }
        this.handleModal = this.handleModal.bind(this);
    }
    componentDidMount() {
        axios.get(`/api/primates/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    profile: res.data,
                    images: res.data[0].photo_urls
                })
            }).catch(err => console.log('Err in primate profile axios.get', err));
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
        let { profile, images, modal } = this.state;
        console.log(modal);
        
        let mappedProfile = profile.map(primate => {
            let { name, species, dob, gender, bio, photo_urls } = primate;
            let mappedPhotos = photo_urls.map((photo, i) => {
                return <img key={i} onClick={() => this.handleModal(i)} className="gallery-image" src={photo} alt={name} />
            })
            
            return <div className="primateProfile" key={primate.id}>
                <img src={profile[0].photo_urls[0]} alt={profile[0].name} />
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

        })
    return ( 
        <div className="primateProfile-container">
            {mappedProfile}
            <div className={`modal-container ${modal ? 'modal-container-show' : '' }`} onClick={() => this.handleModal()}>
                    <div id="modal" className={`modal ${modal ? 'modal-show' : ''}`} >
                    <img id="modal-image" src='' alt='Primate Modal Picture' />
                    </div>
                </div>
        </div>
     );
    }
}
 
export default PrimateProfile;