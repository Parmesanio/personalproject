import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { createPrimateProfile, editPrimateProfile } from '../../redux/reducer';
import { withRouter } from 'react-router-dom';
const CLOUDINARY_UPLOAD_PRESET = 'talkinmonkeysproject',
      CLOUDINARY_UPLOAD_URL    = 'https://api.cloudinary.com/v1_1/parmesanio/upload';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            species: '',
            dob: '',
            gender: '',
            bio: '',
            photo_urls: '',
            uploadedFileCloudinaryUrl: '',
            uploadedFiles: []
         }
         this.onSubmit = this.onSubmit.bind(this);
        //  this.onImageDrop = this.onImageDrop.bind(this);
    }
    componentDidMount() {
        let currentProfile = {};
        this.props.match.params.id ?
        currentProfile = this.props.primateList.find(item => item.id == this.props.match.params.id) :
        null;
        this.setState({
            name: currentProfile.name,
            species: currentProfile.species,
            dob: currentProfile.dob,
            gender: currentProfile.gender,
            bio: currentProfile.bio,
            photo_urls: currentProfile.photo_urls
        })
    }
    handleName(event) {
        this.setState({
            name: event.target.value
        })
    }
    handleSpecies(event) {
        this.setState({
            species: event.target.value
        })
    }
    handleDob(event) {
        this.setState({
            dob: event.target.value
        })
    }
    handleGender(event) {
        this.setState({
            gender: event.target.value
        })
    }
    handleBio(event) {
        this.setState({
            bio: event.target.value
        })
    }
    handlePhotos(event) {
        this.setState({
            photo_urls: event.target.value
        })
    }
    onImageDrop(files) {
        console.log(files);
        
        this.setState({
          uploadedFiles: files
        });
    
        this.handleImageUpload(files);
      }
      handleImageUpload(file) {
          console.log('handleImageUpload', file);
          
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
                            console.log(upload);
                            
    
        upload.end((err, response) => {
            console.log(response);
            
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
      }
    // handleFavorites(event) {
    //     console.log(event.target.value);
    //     this.setState({
    //         favorites: event.target.value
    //     })
    // }
    onSubmit(event) {
        event.preventDefault();
    }
    render() {
        let { name, species, dob, gender, bio, photo_urls, uploadedFiles } = this.state
        let { admin, createPrimateProfile, editPrimateProfile, primateList } = this.props;
        let { id } = this.props.match.params;
        let mappedCloudPhotos = uploadedFiles.map(file => {
            {photo_urls += ',' + this.state.uploadedFileCloudinaryUrl}
            return <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
            <p>{file.name}</p>
            {/* <img src={this.state.uploadedFileCloudinaryUrl} /> */}
            </div>}
        </div>
        })
        
        return ( 
            admin.name ? this.props.match.params.id ? 
            <div>
                <h1>Edit Primate Profile</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Name:</label>
                    <input onChange={(event) => this.handleName(event)} type="text" value={name} />
                    <label>Species:</label>
                    <input onChange={(event) => this.handleSpecies(event)} type="text" value={species} />
                    <label>Date of birth:</label>
                    <input onChange={(event) => this.handleDob(event)} type="text" value={dob || ''} />
                    <label>Gender:</label>
                    <input onChange={(event) => this.handleGender(event)} type="text" value={gender || ''} />
                    <label>Bio:</label>
                    <textarea onChange={(event) => this.handleBio(event)} type="text" value={bio || ''}></textarea>
                    <label>Photos:</label>
                    <Dropzone
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    {mappedCloudPhotos}
                    <textarea onChange={(event) => this.handlePhotos(event)} type="text" value={photo_urls || ''} />
                    <button onClick={() => editPrimateProfile(id, name, species, dob, gender, bio, photo_urls, admin.id)}>Submit</button>
                </form>
            </div>
            :
            <div>
                <h1>Create Primate Profile</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Name:</label>
                    <input onChange={(event) => this.handleName(event)} type="text" placeholder="Name..." />
                    <label>Species:</label>
                    <input onChange={(event) => this.handleSpecies(event)} type="text" placeholder="Species..." />
                    <label>Date of birth:</label>
                    <input onChange={(event) => this.handleDob(event)} type="text" placeholder="Date of birth..." />
                    <label>Gender:</label>
                    <input onChange={(event) => this.handleGender(event)} type="text" placeholder="Gender..." />
                    <label>Bio:</label>
                    <textarea onChange={(event) => this.handleBio(event)} type="text" placeholder="Bio..."></textarea>
                    <label>Photos:</label>
                    <input onChange={(event) => this.handlePhotos(event)} type="text" placeholder="Separate image URLs with commas..." />
                    <button onClick={() => createPrimateProfile(name, species, dob, gender, bio, photo_urls, admin.id)}>Submit</button>
                </form>
            </div>
            :
            <p>Log in to view this page</p>
         );
    }
}

const mapStateToProps = state => {
    let { admin, primateList } = state.primates;

    return {
        admin,
        primateList
    }
}
 
export default connect(mapStateToProps, {createPrimateProfile, editPrimateProfile})(withRouter(Create));