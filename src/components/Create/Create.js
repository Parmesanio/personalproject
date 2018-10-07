import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import { createPrimateProfile, editPrimateProfile } from '../../redux/primateReducer';
import { withRouter } from 'react-router-dom';
import './forms.css';
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
            photo_urls: [],
            uploadedFileCloudinaryUrl: '',
            uploadedFiles: []
         }
         this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        let currentProfile = {};
        this.props.match.params.id && (
        currentProfile = this.props.primateList.find(item => item.id == this.props.match.params.id) 
        )
        this.setState({
            name: currentProfile.name,
            species: currentProfile.species,
            dob: currentProfile.dob,
            gender: currentProfile.gender,
            bio: currentProfile.bio,
            photo_urls: currentProfile.photo_urls
        })
    }
    onImageDrop(files) {
        console.log(files);
        
        this.setState({
          uploadedFiles: files
        });
    
        this.handleImageUpload(files);
      }
      handleImageUpload(files) {
          console.log('handleImageUpload', files);
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', files);
            console.log(upload);
                        

            upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '' || response.body.secure_url !== undefined) {
            let photo_urls = response.body.secure_url,
            uploadedFileCloudinaryUrl = response.body.secure_url;

            this.setState({
            ...this.state, photo_urls, uploadedFileCloudinaryUrl
            });
            }
            });

      }
      handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
    }
    render() {
        let { name, species, dob, gender, bio, photo_urls, uploadedFiles } = this.state
        let { admin, createPrimateProfile, editPrimateProfile, primateList } = this.props;
        let { id } = this.props.match.params;
        
        let mappedCloudPhotos = uploadedFiles.map(file => {
            return <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
            <p>{file.name}</p>
            </div>}
        </div>
        })
        
        return ( 
            <div className="forms">
            {admin.name ? this.props.match.params.id ? 
            <div>
                <h1>Edit Primate Profile</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Name:</label>
                    <input name="name" onChange={(event) => this.handleChange(event)} type="text" value={name} />
                    <label>Species:</label>
                    <input name="species" onChange={(event) => this.handleChange(event)} type="text" value={species} />
                    <label>Date of birth:</label>
                    <input name="dob" onChange={(event) => this.handleChange(event)} type="text" value={dob || ''} />
                    <label>Gender:</label>
                    <input name="gender" onChange={(event) => this.handleChange(event)} type="text" value={gender || ''} />
                    <label>Bio:</label>
                    <textarea name="bio" onChange={(event) => this.handleChange(event)} type="text" value={bio || ''}></textarea>
                    <label>Photos:</label>
                    <Dropzone
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    {mappedCloudPhotos}
                    <label>Photo URLs Appear Below</label>
                    <textarea name="photo_urls" onChange={(event) => this.handleChange(event)} type="text" value={photo_urls || ''} />
                    <button onClick={() => editPrimateProfile(id, name, species, dob, gender, bio, photo_urls, admin.id)}>Edit Profile</button>
                </form>
            </div>
            :
            <div>
                <h1>Create Primate Profile</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label>Name:</label>
                    <input name="name" onChange={(event) => this.handleChange(event)} type="text" placeholder="Name..." />
                    <label>Species:</label>
                    <input name="species" onChange={(event) => this.handleChange(event)} type="text" placeholder="Species..." />
                    <label>Date of birth:</label>
                    <input name="dob" onChange={(event) => this.handleChange(event)} type="text" placeholder="Date of birth..." />
                    <label>Gender:</label>
                    <input name="gender" onChange={(event) => this.handleChange(event)} type="text" placeholder="Gender..." />
                    <label>Bio:</label>
                    <textarea name="bio" onChange={(event) => this.handleChange(event)} type="text" placeholder="Bio..."></textarea>
                    <label>Photos:</label>
                    <Dropzone
                        multiple={true}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                    {mappedCloudPhotos}
                    <label>Photo URLs Appear Below</label>
                    <textarea name="photo_urls" onChange={(event) => this.handleChange(event)} type="text" value={photo_urls !== 'undefined' ? photo_urls : ''} />
                    <button onClick={() => createPrimateProfile(name, species, dob, gender, bio, photo_urls, admin.id)}>Create Profile</button>
                </form>
            </div>
            :
            <p>Log in to view this page</p>}
            </div>
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