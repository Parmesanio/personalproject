import React, { Component } from 'react';
import { connect } from 'react-redux';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            species: '',
            dob: '',
            gender: '',
            bio: '',
            photo_urls: []
         }
    }
    handleName(event) {
        console.log(event.target.value);
        this.setState({
            name: event.target.value
        })
    }
    handleSpecies(event) {
        console.log(event.target.value);
        this.setState({
            species: event.target.value
        })
    }
    handleDob(event) {
        console.log(event.target.value);
        this.setState({
            dob: event.target.value
        })
    }
    handleGender(event) {
        console.log(event.target.value);
        this.setState({
            gender: event.target.value
        })
    }
    handleBio(event) {
        console.log(event.target.value);
        this.setState({
            bio: event.target.value
        })
    }
    handlePhotos(event) {
        console.log(event.target.value);
        this.setState({
            photo_urls: event.target.value
        })
    }
    // handleFavorites(event) {
    //     console.log(event.target.value);
    //     this.setState({
    //         favorites: event.target.value
    //     })
    // }
    render() {
        let { admin } = this.props;
        return ( 
            admin.name ? 
            <div>
                <h1>Create Primate Profile</h1>
                <form>
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
                    
                    <button>Submit</button>
                </form>
            </div>
            : <p>Log in to view this page</p>
         );
    }
}

const mapStateToProps = state => {
    let { admin } = state.primates;

    return {
        admin
    }
}
 
export default connect(mapStateToProps, {})(Create);